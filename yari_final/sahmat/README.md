# Şahmat

|    |  |
| ------------- |:-------------:|
| Zorluk        | Çerez(100 Puan)|
| Aşama         | Yarı Final    |
| Soru Türü     | Miscellaneous |
| Dosyalar      | sms.apk       |    
| Yazar         | [Rednexie](https://github.com/Rednexie) | 


### Sorunun alakalı olduğu alanlar
- Android Uygulama Güvenliği
- Web Uygulama Güvenliği 


## Soru Açıklaması
```
Zeki ama teknolojik konulardan bihaber bir oyuncu olan şahmat, kurduğu platformdan telefonuna gelen tüm SMS'lerdeki bağlantılara tıklamaktadır.
```


### Sorunun alakalı olduğu alanlar
- Web Güvenliği
- Android 

## İpuçları
```
URL'yi nereden bileyim ki, senden duydum ben. ~sunucu
```

## Bayrak
```
BayrakBende{ş4h_M4t_L1br*r4l}
```


# WriteUp

## APK'nın incelenmesi ve Sitenin Genel Analizi

Soruda bize bir adet APK ve bir adet web sitesine erişim verilmektedir. 
Siteyi açtığımızda karşımıza popup olarak bir yönlendirici token'ı çıkmaktadır. Bu token gelecekte APK dosyasında karşımıza çıkacağı için şimdilik boşverebiliriz.


Sitenin içeriği ve amacına göz attığımızda, görüldüğü üzere şahmat isimli bir çevrimiçi satranç platformudur. Ayrıca bir sms onaylama sistemiyle anlaşmalı olduğu görülmektedir. Kullanıcılar telefon numaralarıyla buraya kaydolabilmektedirler. Ayrıca şifre sıfırlama gibi olmazsa olmaz platform özellikleri de mevcuttur ve sorunsuz çalışmaktadır.


APK'ya geri döndüğümüzde, APK ise kullanıcıların telefon numaralarını vermek istemedikleri, ancak SMS onaylaması isteyen yerlerde kullanmaları için tasarlanmış bir sistemdir. Şahmat'tan aldığımız token'ı uygulamayı açtığımızda çıkan kısma girdiğimizde, herhangi bir ücret almadan birkaç


