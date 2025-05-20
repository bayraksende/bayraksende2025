# Roller Değişiyor

|    |  |
| ------------- |-------------|
| Zorluk        | Zor (500 Puan)|
| Aşama         | Final    |
| Soru Türü     | Web Güvenliği |
| Yazar(lar)    | [İbrahim CAN](http://github.com/cibrx) |

## Soru Metni

> Urbatek firmasının yöneticilerine anonim olarak mesaj gönderebileceğin bir uygulama bulduk.
> Site henüz geliştirme aşamasında.
> Ayrıca /dev.txt adında bir dosya bulunduğunu fark ettik.

---

## Çözüm
İlk olarak karşımıza bir iletişim sayfası çıkıyor. Burada bulunan iletişim formunu incelediğimizde, sayfanın HTML kaynak kodunda /admin yolunu fark ediyoruz.
Fakat bu sayfaya gitmeye çalıştığımızda sunucu bize 403 Forbidden hatası veriyor.
Uygulamanın /dev.txt yoluna gittiğimizde şu maddelerle karşılaşıyoruz:
```
✓ Misafir kullanıcıyla admine mesaj gönderme  
✓ admin panelinde tüm mesajları sunma  
✓ mesaj için varsayılan özellikler ekleme  
✓ Varsayılan özellikler ile kullanıcı girdisini birleştirme  
✓ isAdmin özelliği true olan istekleri admin paneline kabul etme  
X güvenlik testi yapma
```

Bu maddelerden şunları anlıyoruz:

    Kullanıcının gönderdiği mesajlar varsayılan bir obje ile merge ediliyor.

    isAdmin: true olan isteklerin admin panelinde gösterildiği belirtilmiş.

    Güvenlik testi yapılmamış, bu nedenle açıklara açık.

    Bu durum bize Prototype Pollution açığının olabileceğini gösteriyor.
### Saldırı

Bu tür açıklar genellikle Object.assign() veya benzeri merge işlemlerinde kullanıcı girdisinin kontrol edilmemesinden kaynaklanır.

Sunucuya yapılan isteğin JSON formatında olduğunu gördüğümüzde şu şekilde bir payload hazırlıyoruz:
```
{
  "__proto__": {
    "isAdmin": true
  },
  "message": "merhaba admin"
}
```
Bu payload, tüm objelerin prototipine isAdmin: true özelliğini enjekte eder.
Böylece admin kontrolü devre dışı kalır.
Payload'ı gönderdikten sonra /admin sayfasına tekrar gitmeye çalışıyoruz.
Artık 403 Forbidden hatası yerine bir admin paneli ile karşılaşıyoruz!
Panelde yer alan mesajlar arasında flag yer alıyor.

## Bayrak
```
BayrakBende{bu_s3f3r_s4n4l_4dm1n_l1nkl3r3_t1kl4m1y0r}
```
