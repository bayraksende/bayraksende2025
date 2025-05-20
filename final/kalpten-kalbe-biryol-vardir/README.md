# Kalpten Kalbe Bir Yol Vardır

|    |  |
| ------------- |-------------|
| Zorluk        | Orta (350 Puan)|
| Aşama         | Final    |
| Soru Türü     | Android |
| Yazar(lar)    | [Burak Aydın](http://github.com/GrgnPl) |

## Çözüm

ilk olarak decompile edilir. 

```bash
jadx-gui heart_monitor.apk
```

Decompile edilen kodda tespit edilmesi gereken anahtar noktalar:

- `MainActivity.java`: Ana aktivite sınıfı
- `SecureHeartRateDbHelper`: SQLite veritabanı erişimi
- `FlagProvider`: Flag'i karakter kodları olarak saklayan sınıf
- `SensitiveDataProvider`: Frida bypass kodunu saklayan sınıf
- `isRooted()`, `isEmulator()`, `isBeingDebugged()`: Güvenlik kontrol metotları
- `isDeviceCompatible()`: Bluetooth bağlantı kontrolü
- `hashToken()`: Token obfuscation mekanizması

Statik analizde özellikle dikkat edilmesi gerekenler:
1. Assets klasöründeki SQLite veritabanı (`heartrate.db`)
2. Tuzak tablolar ve gerçek tablolar
3. Karakter kodları dizileri

## Adım 2: Güvenlik Önlemlerini Bypass Etme

Güvenlik kontrollerini bypass etmek için şu Frida script'ini kullanıcaktır:

```javascript
// security_bypass.js
setTimeout(function() {
  Java.perform(function() {
    var MainActivity = Java.use("com.example.tririmtririm.MainActivity");
    
    // Root detection bypass
    MainActivity.isRooted.implementation = function() {
      console.log("[+] Root detection bypassed");
      return false;
    };
    
    // Emulator detection bypass
    MainActivity.isEmulator.implementation = function() {
      console.log("[+] Emulator detection bypassed");
      return false;
    };
    
    // Anti-debugging bypass
    MainActivity.isBeingDebugged.implementation = function() {
      console.log("[+] Anti-debugging bypassed");
      return false;
    };
  });
}, 0);
```

Script'i çalıştırdıktan sonra emulator ve root detection baypass edilecektir:

```bash
frida -U -l security_bypass.js -f com.example.tririmtririm
```

## Adım 3: Bluetooth Bağlantısı İpucunu Bulma

Uygulamayı çalıştırıp "Connect" butonuna bastığınızda, loglarda gizli bir ipucu bulunmaktadır:

```bash
adb logcat | grep "SYSTEM"
```

Loglar arasında şu şüpheli veri görünecektir:

```
SYSTEM: Error data: [Base64 encoded data]
```

Bu Base64 kodlu veriyi decode etmek için:

```bash
echo "[Base64 encoded data]" | base64 -d
```

Ancak karmaşıklaştırma nedeniyle, bu veri aslında birden fazla katmanda kodlanmış:

1. İlk decode edilen veri, `SensitiveDataProvider` sınıfından gelen karakter kodu verisidir.
2. Bu veri de bir Base64 kodlanmış Frida script'idir.

Bu veriyi doğru şekilde decode etmek ve anlamak için, decompile edilmiş kodda `SensitiveDataProvider` sınıfını inceleyip, kodun çalışma mantığını anlamak gerekir.

Son olarak, decode edilen veri şu Frida script'ini verecektir:

```javascript
setTimeout(function(){Java.perform(function(){var MainActivity = Java.use("com.example.tririmtririm.MainActivity");MainActivity.isDeviceCompatible.implementation = function(){return true;}});});
```

Bu script'i kullanarak Bluetooth bağlantısını bypass edilir:

```bash
frida -U -l bluetooth_bypass.js -f com.example.tririmtririm
```

## Adım 4: SQLite Veritabanını Analiz Etme

Uygulamanın veritabanı yapısını anlamak için:

1. Veritabanını cihazdan çıkartmak için:
```bash
adb shell "run-as com.example.tririmtririm cat /data/data/com.example.tririmtririm/databases/heartrate.db" > heartrate.db
```

2. Veritabanını bir SQL tarayıcısı ile açıp analiz etmek için:
```bash
sqlitebrowser heartrate.db
```

Veritabanında iki tablo bulunmaktadır:
- `heart_readings`: Bu bir tuzak tablodur, gerçek veriler burada değildir
- `x_h3art_data`: Gerçek veriler burada saklanır, ancak isimler ve yapı karmaşıklaştırılmıştır

Doğru tabloyu analiz ederek, token mekanizmasını anlamanız gerekiyor:
- `"regular_any_token"` değeri 100 döndürür
- `"c3b2a1_special_key"` değeri 120 döndürür (flag almak için bu değer gereklidir)

## Adım 5: Token Mekanizmasını Anlama

Uygulamanın loglarını izleyerek token kullanımı hakkında ipuçları bulunur:

```bash
adb logcat | grep "DB-ACCESS"
```

Logda şu ipucunu gördükten sonra:
```
DB-ACCESS: Debug info: RXhwZWN0ZWQgZGV2aWNlIElEIHNob3VsZCBzdGFydCB3aXRoICcxYTJiM2Mn
```

Bu Base64 şifreli veriyi decode ederek:
```bash
echo "RXhwZWN0ZWQgZGV2aWNlIElEIHNob3VsZCBzdGFydCB3aXRoICcxYTJiM2Mn" | base64 -d
```

Şu mesaj alınır: `Expected device ID should start with '1a2b3c'`

Decompile edilmiş kodu inceleyerek, `hashToken()` metodunu bulun. Bu metot token değerlerini nasıl dönüştürdüğünü gösterir:
- Kullanıcı "1a2b3c" token'ını kullandığında, bu aslında veritabanında "c3b2a1_special_key" olarak aranır
- Diğer tüm token değerleri "regular_" önekiyle aranır

Aygıt ID'nizi değiştirerek doğru token'ı kullanılır:
```bash
adb shell settings put secure android_id 1a2b3c4d5e6f7890
```

## Adım 6: Doğru Değeri Elde Etme ve Flag'i Bulma

Bütün koruma mekanizmalarını bypass ettikten ve cihaz ID'nizi "1a2b3c" ile başlayacak şekilde değiştirdikten sonra:

1. Uygulamayı açılır
2. Bluetooth bağlantısını Frida ile bypass ettikten sonra
3. "Measure Heart Rate" butonuna basılır

Uygulama 120 değerini gösterecek ve loglarda bir flag bilgisi olacak:

```bash
adb logcat | grep "HEALTH-MONITOR"
```

Loglar arasında şu bilgiyi bulacaksınız:
```
HEALTH-MONITOR: Session data: [Base64 encoded flag]
```

Bu veriyi decode etmek için:
```bash
echo "[Base64 encoded flag]" | base64 -d
```

Ancak flag da çoklu katmanda kodlanmıştır:
1. İlk Base64 decode sonucu `FlagProvider` sınıfından gelen karakter kodlarıdır
2. Bu veriyi decode etmek için decompile edilmiş koddaki algoritmayı takip etmeniz gerekir

## Flag
```
BayrakBende{s4gl2k_on4ml1}
```
