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

## Soru Hakkında Bildiklerimiz ve Giriş

Soru ile ilgili bilgilerimiz aşağıdaki gibidir: 
- Soru için bize bir web sitesi, bir de Android Uygulaması(APK olarak) verilmiştir.
- Soruda verilen sitenin sahipleri, siteden gelen her türlü sms'teki bağlantıya tıklamaktadırlar, kendileri göndermiş olmasalar bile. 


## APK'nın incelenmesi ve Sitenin Genel Analizi

Soruda bize bir adet APK ve bir adet web sitesine erişim verilmektedir. 
Siteyi açtığımızda karşımıza popup olarak bir yönlendirici token'ı çıkmaktadır. Bu token gelecekte APK dosyasında karşımıza çıkacağı için şimdilik boşverebiliriz.


Sitenin içeriği ve amacına göz attığımızda, görüldüğü üzere şahmat isimli bir çevrimiçi satranç platformudur. Ayrıca bir sms onaylama sistemiyle anlaşmalı olduğu görülmektedir. Kullanıcılar telefon numaralarıyla buraya kaydolabilmektedirler. Ayrıca şifre sıfırlama gibi olmazsa olmaz platform özellikleri de mevcuttur ve sorunsuz çalışmaktadır.


APK'ya geri döndüğümüzde, APK ise kullanıcıların telefon numaralarını vermek istemedikleri, ancak SMS onaylaması isteyen yerlerde kullanmaları için tasarlanmış bir sistemdir. Şahmat'tan aldığımız token'ı uygulamayı açtığımızda çıkan kısma girdiğimizde, herhangi bir ücret almadan birkaç tane telefon numarası kullanımımıza sunulmaktadır. Bize düşen de bu telefon numaralarını kullanarak Şahmat üyeliğimizi oluşturmak ve hesapla ilgili fonskiyonları inceleyebilmektir.

Kayıt olma kısmına telefon numaramız, kullanıcı admız ve şifremizi girdiğimizde herhangi bir sıradışı durumla karşılaşmamamız gerekmektedir. Uygulamadan seçtiğimz numaranın mesajlarına, kaydımızı tamamladığımızla ilgili bir SMS gelecektir. Diğer kısımları incelediğimizde ise gözümüze çarpan şey şu olmalıdır: Telefon numarasını bilmediğimiz kullanıcıların telefonlarına şifre sıfırlama bağlantısı gönderebilmekteyiz, bunu kontrol etmek için kendi kullanıcı adımızı girerek kendimize bir SMS gönderebiliriz.

Burada aklımıza takılması gereken, gelen sms bağlantısıdaki URL'nin hardcoded olamayacak kadar spesifik olmasıdır. URL https değildir ve bir port içermektedir. Muhtemelen sunucu tarafında bir şekilde isteğin geldiği URL elde edilmekte ve gönderilen SMS'te bu kullanılmaktadır.

Sorunun açıklama kısmında bize platformun şu anki yöneticisi olan 'admin' kullanıcısının, herhangi bir kontrol yapmaksızın platformdan telefonuna gelen her türlü SMS'teki bağlantıyı açtığı belirtilmektedir. 

