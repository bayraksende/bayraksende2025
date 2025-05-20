# Sızan Sarmalı

|    |  |
| ------------- |-------------|
| Zorluk        | Zor (500 Puan)|
| Aşama         | Final    |
| Soru Türü     | Android |
| Yazar(lar)    | [Burak Aydın](http://github.com/GrgnPl) |

## Çözüm

### Adım 1: Uygulamayı Decompile Etme ve Analiz
```bash
jadx -d output_folder app-debug.apk
```

Kaynak kodunu incelediğimizde, çoklu güvenlik mekanizmaları tespit ediyoruz:
- Memory leak sorunları
- Anti-tampering kontrolleri
- Root ve emulator tespiti
- Çok katmanlı flag şifreleme
- Sahte flag üretimi
- Zaman tabanlı kısıtlamalar

### Adım 2: Anti-Tampering ve Root Detection Bypass

Aşağıdaki Frida script ile koruma mekanizmalarını bypass ediyoruz:

```javascript
Java.perform(function() {
    console.log("[*] Koruma Mekanizmaları Bypass Ediliyor");
    
    // Anti-tampering bypass
    var MainActivity = Java.use("com.example.sizansarmali.MainActivity");
    MainActivity.isAppModified.implementation = function() {
        console.log("[+] Anti-tampering bypass edildi");
        return false;
    };
    
    // Root detection bypass
    var SecurityChecker = Java.use("com.example.sizansarmali.MainActivity$SecurityChecker");
    SecurityChecker.isRooted.implementation = function() {
        console.log("[+] Root detection bypass edildi");
        return false;
    };
    
    // Emulator detection bypass
    SecurityChecker.isEmulator.implementation = function() {
        console.log("[+] Emulator detection bypass edildi");
        return false;
    };
    
    // Debug detection bypass
    SecurityChecker.isBeingDebugged.implementation = function() {
        console.log("[+] Debug detection bypass edildi");
        return false;
    };
    
    // Zaman sınırlamaları bypass
    var Companion = Java.use("com.example.sizansarmali.MainActivity$Companion");
    Companion.getFlag.implementation = function() {
        console.log("[+] getFlag çağrıldı, originalı izleniyor");
        // attempts ve challengeStartTime değerlerini sıfırla
        this.attempts.value = 0;
        this.challengeStartTime.value = 0;
        var result = this.getFlag();
        console.log("[+] Obfuscated flag: " + result);
        return result;
    };
});
```

### Adım 3: Flag Şifreleme Katmanlarını Çözme

Uygulamada flag'in çok katmanlı şifrelendiğini görüyoruz. Frida ile şifreleme adımlarını yakalayalım:

```javascript
Java.perform(function() {
    console.log("[*] Flag şifreleme adımlarını izliyoruz");
    
    // Şifrelenmiş flag'i almak için getComplexFlag metodunu hook edelim
    var MainActivity = Java.use("com.example.sizansarmali.MainActivity");
    MainActivity.getComplexFlag.implementation = function() {
        console.log("[+] getComplexFlag çağrıldı");
        var result = this.getComplexFlag();
        console.log("[+] AES Şifrelenmiş Flag: " + result);
        return result;
    };
    
    // Obfuscation adımını izle
    var Companion = Java.use("com.example.sizansarmali.MainActivity$Companion");
    Companion.obfuscate.implementation = function(input) {
        console.log("[+] obfuscate input: " + input);
        var result = this.obfuscate(input);
        console.log("[+] obfuscate output: " + result);
        return result;
    };
    
    // ROT13 ve Base64 adımlarını yakalayabilmek için
    MainActivity.encryptAES.implementation = function(data, key) {
        console.log("[+] AES şifreleme öncesi (Base64): " + data);
        console.log("[+] AES anahtarı: " + key);
        var result = this.encryptAES(data, key);
        return result;
    };
    
    // Debug log'larını izle
    console.log("[*] Debug log'ları izleniyor...");
    console.log("[*] Logcat'te şunu arayın: DEBUG_INFO:");
    
    // Flag parçalarını alarak raw flag'i oluşturalım - bu sadece şifreleme adımlarını anlamak için
    var flagPart1 = [];
    var flagPart2 = [];
    var flagPart3 = [];
    
    try {
        // Flag parçalarını oku
        Companion.flagPart1.value.forEach(function(val) {
            flagPart1.push(String.fromCharCode(val));
        });
        
        Companion.flagPart2.value.forEach(function(val) {
            flagPart2.push(String.fromCharCode(val));
        });
        
        Companion.flagPart3.value.forEach(function(val) {
            flagPart3.push(String.fromCharCode(val));
        });
        
        var rawFlag = flagPart1.join('') + flagPart2.join('') + flagPart3.join('');
        console.log("[+] Ham Flag Parçaları: " + rawFlag);
        console.log("[*] Bu ham flag şimdi çoklu şifreleme adımlarından geçirilecek...");
    } catch (e) {
        console.log("[-] Flag parçaları alınırken hata: " + e);
    }
    
    // Şifre çözme anahtarlarını al
    var keyParts = [];
    try {
        Companion.baseKeyParts.value.forEach(function(val) {
            keyParts.push(String.fromCharCode(val));
        });
        console.log("[+] Şifre anahtarı: " + keyParts.join(''));
    } catch (e) {
        console.log("[-] Anahtar alınırken hata: " + e);
    }
    
    // IV değerlerini al
    var ivBytes = [];
    try {
        Companion.iv.value.forEach(function(val) {
            ivBytes.push(val);
        });
        console.log("[+] IV değerleri: " + ivBytes);
    } catch (e) {
        console.log("[-] IV alınırken hata: " + e);
    }
});
```

Yukarıdaki Frida çıktısından aldığımız bilgileri kullanarak şifrelenmiş flag'i çözmek için Python script'i:

```python
import base64
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
import hashlib

# Frida çıktısından alınan değerler
encrypted_flag = "aNz6m9Wl8kCRuSD2ksRjJM/r9xDHLJHD1vd+KqI3qCClIoJ0RY2PvS9UUvl2iasj" # AES şifrelenmiş flag
key_str = "S1z4nS4rm4l1" # baseKeyParts değeri
iv_bytes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] # iv değeri

# 1. AES şifre çözme
def decrypt_aes(encrypted_data, key_str):
    # SHA-256 ile anahtar oluştur ve ilk 16 byte'ı al
    key = hashlib.sha256(key_str.encode()).digest()[:16]
    iv = bytes(iv_bytes)
    
    # AES-CBC şifre çözme
    cipher = AES.new(key, AES.MODE_CBC, iv)
    try:
        encrypted_bytes = base64.b64decode(encrypted_data)
        decrypted_data = unpad(cipher.decrypt(encrypted_bytes), AES.block_size)
        return decrypted_data.decode('utf-8')
    except Exception as e:
        print(f"AES çözme hatası: {e}")
        return None

# 2. Base64 decode
def base64_decode(data):
    try:
        return base64.b64decode(data).decode('utf-8')
    except Exception as e:
        print(f"Base64 çözme hatası: {e}")
        return None

# 3. ROT13 benzeri şifre çözme
def derot(text):
    result = ""
    for c in text:
        if c.isalpha():
            base = ord('A') if c.isupper() else ord('a')
            # ROT13 için +13, burada -13 yapıyoruz
            result += chr((ord(c) - base - 13) % 26 + base)
        elif c.isdigit():
            # Sayılar için +5, burada -5 yapıyoruz
            result += chr((ord(c) - ord('0') - 5) % 10 + ord('0'))
        else:
            result += c
    return result

# 4. Obfuscate fonksiyonunun tersini uygula
def deobfuscate(obfuscated_str):
    parts = obfuscated_str.split('.')
    if parts[-1] == '':  # Son eleman boşsa kaldır
        parts = parts[:-1]
    
    chars = []
    for part in parts:
        if part:  # Boş değilse
            try:
                char_code = int(part) - 1
                char = chr(char_code ^ 0x7)
                chars.append(char)
            except ValueError:
                pass
    
    return ''.join(chars[::-1])  # Tersine çevir

# Adım adım şifre çözme
print("AES şifrelenmiş: ", encrypted_flag)

# 1. AES şifre çözme
base64_data = decrypt_aes(encrypted_flag, key_str)
print("Base64 encoded: ", base64_data)

# 2. Base64 decode
rot_data = base64_decode(base64_data)
print("ROT13 encoded: ", rot_data)

# 3. ROT13 çözme
obfuscated_data = derot(rot_data)
print("Obfuscated: ", obfuscated_data)

# 4. Obfuscate çözme
raw_flag = deobfuscate(obfuscated_data)
print("FLAG: ", raw_flag)
# Beklenen çıktı: BayrakBende{s1z1nt1l4r1_onl4}
```

Ayrıca logcat çıktısında şifrelenmiş flag'in hash değerini yakalamak için:

```bash
adb logcat | grep "DEBUG_INFO"
```

Çıktı: `DEBUG_INFO: 1623845712345_-1876234567`

Buradaki `-1876234567` değeri, şifrelenmiş flag'in hashCode() değeri olup, bu da flag'in doğru olarak çözüldüğünü doğrulamak için kullanılabilir.

### Adım 4: Memory Leak Sorunlarını Tespit Etme ve Çözme

Android Studio'da bulunan Android Profiler aracını kullanarak memory leak sorunlarını tespit ediyoruz:

1. Android Studio'da "Profiler" sekmesini açın
2. "MEMORY" bölümünü seçin
3. Uygulamayı çalıştırıp farklı aktiviteler arasında geçiş yapın
4. "Dump Java Heap" butonuna tıklayarak bellek dökümü alın
5. "Leaked Activities" kısmında aktivitelerin temizlenmediğini gözlemleyin

Uygulamada şu memory leak sorunları mevcut:
1. Statik MainActivity referansı
2. Temizlenmeyen background thread'ler
3. İptal edilmeyen Handler callback'leri
4. İç içe sınıflardaki örtük referanslar

```javascript
Java.perform(function() {
    console.log("[*] Memory Leak Fixer Yükleniyor");
    
    // MainActivity sınıfını bul
    var MainActivity = Java.use("com.example.sizansarmali.MainActivity");
    var MainActivityCompanion = Java.use("com.example.sizansarmali.MainActivity$Companion");
    
    // onDestroy metodunu hook et
    MainActivity.onDestroy.overload().implementation = function() {
        console.log("[+] onDestroy metodu hook edildi - Memory leak'ler düzeltiliyor");
        
        // Orijinal metodu çağır
        this.onDestroy();
        
        // Statik referansı temizle
        MainActivityCompanion.instance.value = null;
        console.log("[+] Statik activity referansı temizlendi");
        
        // Thread havuzunu kapat
        if (this.executorService.value) {
            this.executorService.value.shutdown();
            console.log("[+] ExecutorService kapatıldı");
        }
        
        // Handler callback'leri iptal et
        MainActivityCompanion.mainHandler.value.removeCallbacksAndMessages(null);
        console.log("[+] Handler callbacks temizlendi");
        
        // Statik background tasks listesini temizle
        MainActivityCompanion.backgroundTasks.value.clear();
        console.log("[+] Background tasks listesi temizlendi");
        
        // Timer kontrolü (eğer varsa)
        if (this.challengeTimer.value) {
            this.challengeTimer.value.cancel();
            console.log("[+] Timer durduruldu");
        }
        
        console.log("[+] Tüm memory leak'ler başarıyla düzeltildi!");
    };
    
    // backgroundTasks boyutunu değiştirerek flags kontrolünü bypass et
    var ArrayList = Java.use('java.util.ArrayList');
    ArrayList.size.overload().implementation = function() {
        var callingObject = this.toString();
        if (callingObject.includes("backgroundTasks")) {
            console.log("[+] backgroundTasks.size() çağrıldı, 0 döndürülüyor");
            return 0;  // Zero size özel kontrolleri bypass etmek için
        }
        return this.size();
    };
    
    console.log("[*] Memory leak düzeltme script'i başarıyla yüklendi. Aktiviteyi sonlandırıp tekrar açın.");
});
```

Bu Frida scriptini `memory_leak_fixer.js` olarak kaydedip aşağıdaki komutla çalıştırıyoruz:

```bash
frida -U -l memory_leak_fixer.js -f com.example.sizansarmali
```

Bu script çalıştığında şu çıktıyı göreceğiz:
```
[*] Memory Leak Fixer Yükleniyor
[*] Memory leak düzeltme script'i başarıyla yüklendi. Aktiviteyi sonlandırıp tekrar açın.
[+] onDestroy metodu hook edildi - Memory leak'ler düzeltiliyor
[+] Statik activity referansı temizlendi
[+] ExecutorService kapatıldı
[+] Handler callbacks temizlendi
[+] Background tasks listesi temizlendi
[+] Timer durduruldu
[+] Tüm memory leak'ler başarıyla düzeltildi!
[+] backgroundTasks.size() çağrıldı, 0 döndürülüyor
```


### Adım 5: Tüm Çözümleri Birleştirme

**Not: Bu CTF'de kaynak koda erişim bulunmamaktadır. Tüm çözüm adımları JADX ile decompile edilen kodu analiz ederek ve Frida ile runtime manipülasyonu kullanılarak uygulanmalıdır.**

1. Uygulamayı JADX ile decompile edip koruma mekanizmalarını analiz ediyoruz:
   ```bash
   jadx -d output_folder app-debug.apk
   ```

2. Frida ile koruma mekanizmalarını bypass ederek flag'i elde ediyoruz:
   ```bash
   frida -U -l bypass_script.js -f com.example.sizansarmali
   ```

3. Flag şifreleme adımlarını Frida ile izleyip flag'i çıkarıyoruz:
   ```javascript
   Java.perform(function() {
       var Companion = Java.use("com.example.sizansarmali.MainActivity$Companion");
       // Flag değerlerini doğrudan alıyoruz
       var flagPart1 = [];
       var flagPart2 = [];
       var flagPart3 = [];
       
       Companion.flagPart1.value.forEach(function(val) {
           flagPart1.push(String.fromCharCode(val));
       });
       
       Companion.flagPart2.value.forEach(function(val) {
           flagPart2.push(String.fromCharCode(val));
       });
       
       Companion.flagPart3.value.forEach(function(val) {
           flagPart3.push(String.fromCharCode(val));
       });
       
       console.log("[+] Raw Flag: " + flagPart1.join('') + flagPart2.join('') + flagPart3.join(''));
       // Çıktı: BayrakBende{s1z1nt1l4r1_onl4}
   });
   ```

4. Memory leak sorunlarını Frida ile düzeltiyoruz:
   ```bash
   frida -U -l memory_leak_fixer.js -f com.example.sizansarmali
   ```

Bütün bu adımları bir araya getirip tam bir çözüm script'i oluşturuyoruz:

```javascript
// complete_solution.js
Java.perform(function() {
    console.log("[*] CTF Çözüm Script'i Yükleniyor");
    
    // 1. Güvenlik bypass
    bypassSecurity();
    
    // 2. Flag'i elde etme
    extractRawFlag();
    
    // 3. Memory leak'leri düzeltme
    fixMemoryLeaks();
    
    function bypassSecurity() {
        console.log("[*] Güvenlik mekanizmaları bypass ediliyor...");
        
        // Anti-tampering bypass
        var MainActivity = Java.use("com.example.sizansarmali.MainActivity");
        MainActivity.isAppModified.implementation = function() {
            console.log("[+] Anti-tampering bypass edildi");
            return false;
        };
        
        // Root detection bypass
        var SecurityChecker = Java.use("com.example.sizansarmali.MainActivity$SecurityChecker");
        SecurityChecker.isRooted.implementation = function() {
            console.log("[+] Root detection bypass edildi");
            return false;
        };
        
        // Emulator detection bypass
        SecurityChecker.isEmulator.implementation = function() {
            console.log("[+] Emulator detection bypass edildi");
            return false;
        };
        
        // Debug detection bypass
        SecurityChecker.isBeingDebugged.implementation = function() {
            console.log("[+] Debug detection bypass edildi");
            return false;
        };
        
        // Zaman kontrollerini bypass etme
        var Companion = Java.use("com.example.sizansarmali.MainActivity$Companion");
        Companion.attempts.value = 0;
        Companion.challengeStartTime.value = 0;
        
        console.log("[+] Tüm güvenlik mekanizmaları bypass edildi");
    }
    
    function extractRawFlag() {
        console.log("[*] Flag değerini ayıklama...");
        
        var Companion = Java.use("com.example.sizansarmali.MainActivity$Companion");
        
        // Flag parçalarını doğrudan al
        var flagPart1 = [];
        var flagPart2 = [];
        var flagPart3 = [];
        
        Companion.flagPart1.value.forEach(function(val) {
            flagPart1.push(String.fromCharCode(val));
        });
        
        Companion.flagPart2.value.forEach(function(val) {
            flagPart2.push(String.fromCharCode(val));
        });
        
        Companion.flagPart3.value.forEach(function(val) {
            flagPart3.push(String.fromCharCode(val));
        });
        
        var rawFlag = flagPart1.join('') + flagPart2.join('') + flagPart3.join('');
        console.log("[+] CTF Flag: " + rawFlag);
    }
    
    function fixMemoryLeaks() {
        console.log("[*] Memory leak düzeltme mekanizması yükleniyor...");
        
        var MainActivity = Java.use("com.example.sizansarmali.MainActivity");
        var MainActivityCompanion = Java.use("com.example.sizansarmali.MainActivity$Companion");
        
        // onDestroy metodunu hook et
        MainActivity.onDestroy.overload().implementation = function() {
            console.log("[+] onDestroy hook edildi - Memory leak'ler düzeltiliyor");
            
            // Orijinal metodu çağır
            this.onDestroy();
            
            // Statik referansı temizle
            MainActivityCompanion.instance.value = null;
            
            // Thread havuzunu kapat
            if (this.executorService.value) {
                this.executorService.value.shutdown();
            }
            
            // Handler callback'leri iptal et
            MainActivityCompanion.mainHandler.value.removeCallbacksAndMessages(null);
            
            // Statik background tasks listesini temizle
            MainActivityCompanion.backgroundTasks.value.clear();
            
            // Timer kontrolü
            if (this.challengeTimer.value) {
                this.challengeTimer.value.cancel();
            }
            
            console.log("[+] Tüm memory leak'ler başarıyla düzeltildi!");
        };
        
        // ArrayList.size manipülasyonu
        var ArrayList = Java.use('java.util.ArrayList');
        ArrayList.size.overload().implementation = function() {
            var callingObject = this.toString();
            if (callingObject.includes("backgroundTasks")) {
                return 0;  // Always return 0 for backgroundTasks
            }
            return this.size();
        };
    }
    
    console.log("[+] CTF Çözüm Script'i başarıyla yüklendi!");
});
```

Tam çözüm scripti çalıştırma komutu:
```bash
frida -U -l complete_solution.js -f com.example.sizansarmali
```

## Flag
```
BayrakBende{s1z1nt1l4r1_onl4}
```