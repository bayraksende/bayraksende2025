# İsviçre Çakısı

|    |  |
| ------------- |:-------------:|
| Zorluk        | Orta(320 Puan)|
| Aşama         | Final         |
| Soru Türü     | Web Güvenliği |
| Çözümler      |               |


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

Ve gelen bağlantıya tıkladığımızda, tam da istek gövdesindeki bağlantıya yönlendirildiğimizi fark etmemiz gerekmektedir.

