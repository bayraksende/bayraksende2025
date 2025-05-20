
# Soru Çözümü 

Öncelikle Olarak Sorumuzda Yeniden Emulator Detection var bunu kullanıcı uygulamayı açmaya çalıştığında açamayıp crash verdikten sonra loglardan bulacak.

```javascript
FATAL EXCEPTION: main

Process: com.example.saklayamadiklarimizdan, PID: 7391
java.lang.RuntimeException: Unable to start activity ComponentInfo{com.example 
saklayamadiklarimizdan/com.example.saklayamadiklarimizdan.MainActivity}: 
java.lang.RuntimeException: Delikanli Adam Emulator Kullanmaz
```

Baypass Etmek İçin 
```javascript
Java.perform(function() {
    var MainActivity = Java.use("com.example.saklayamadiklarimizdan.MainActivity");
    
    // checkEmulator fonksiyonunu hook edip her zaman false döndürmesini sağlayalım
    MainActivity.checkEmulator.implementation = function() {
        console.log("[+] Emülatör tespiti bypass edildi");
        return false;
    };
});
```

Baypass Edilerek Devam Edilir. Karşımıza Gelen Ekrandaki **BayrakBende{YWxzYW5h}** bu flag sahtedir kullanıcıdan istediğimiz yine logları takip etmesi ve şu logu gördükten sonra 

```javascript
Rafa Silva              com.example.saklayamadiklarimizdan   D  Cok Kritik: /data/user/0/com.example.saklayamadiklarimizdan/shared_prefs/ctf_flags.xml
Rafa Silva              com.example.saklayamadiklarimizdan   D  Al Bu Anahtari Sakla : BayrakBende
```

Buradan Sonraki Adımda

```javascript
adb shell "run-as com.example.saklayamadiklarimizdan cat /data/data/com.example.saklayamadiklarimizdan/shared_prefs/ctf_flags.xml"
```

ile ilgili dosya okunarak içerik incelenir.


![Uygulama Ekran Görüntüsü](https://github.com/user-attachments/assets/31b148f7-71aa-4d5b-8acb-b51078ff42ce)

Burada İki tane değer var bu değerler

```javascript
    <string name="config_part1">AAAAAAAAAAAAAAA5BkgI</string>
   
    <string name="config_part2">DVouUQU7CiwEFB5TFg==</string>
```

Bu değerleri alıp logdaki anahtar değer alınıp cyberchef üzerinden decode edildiğinde sorunun cevabı gelmektedir

![Uygulama Ekran Görüntüsü](https://github.com/user-attachments/assets/f14d409e-d52d-4c06-bb9e-cdf733d2b2e1)



