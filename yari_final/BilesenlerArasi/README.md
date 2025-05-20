# Bileşenler arası

|    |  |
| ------------- |-------------|
| Zorluk        | Orta (350 Puan)|
| Aşama         | Yarı Final    |
| Soru Türü     | Web Güvenliği |
| Yazar(lar)    | [İbrahim CAN](http://github.com/cibrx) |

## Soru Metni:

```
Tır ticareti yapan İskenderoğulları ailesi maliyetten tasarruf etmek için sitelerini kendileri yazmaya karar verirler. 
```

## Çözüm:
- Siteye girdiğimizde bizi bir tır galerisi karşılıyor.
- Site üzerindeki özellikler kontrol edilip bağlantılar ziyaret edildiğinde yalnızca tır detaylarının gösterildiği bir özelliğe rastlarız.
- HTTP yanıtlarında gelen başlıkları incelediğimizde `Server` başlığının değerinin `Apache/2.4.41 (Ubuntu)` olduğu dolayısıyla bu sunucunun linux işletim sistemine sahip olduğu anlaşılır.
- Sitenin ağ trafiği incelendiğinde `bilesen.php?yol=/src/img/tir1.png&tip=png` şeklinde bir adrese yapılan birçok istek olduğu görülür.
- Bu url'i yeni bir pencereden tekrardan gönderdiğimizde ekranda png formatında bir fotoğraf görmekteyiz.
- Fotografın yolunun ve uzantısının dinamik olarak get parametrelerinden alındığını farkederiz. Bu da olası bir path traversal zafiyetine açık kapı bırakabilir. 
- Bir zafiyet olup olmadığını tespit etmek için, uygulamanın yol parametresi Linux sisteminde bulunan /etc/host.conf dosyasıyla değiştirilir. Path traversal zafiyetlerinden yararlanmak amacıyla, kök dizine erişmek için bu yolun başına birden fazla ../ ifadesi eklenir. ../, dosya sisteminde bir üst dizine çıkmak için kullanılır. Birden fazla ../ kullanımı, uygulamanın çalışma dizininden başlayarak hedef dosya ya da dizine ulaşana kadar gerekli sayıda üst dizine çıkılmasını sağlar. Örneğin, uygulamanın çalışma dizini /var/www/html/app/uploads ise, /etc/host.conf dosyasına erişmek için ../../../../../etc/host.conf ifadesi kullanılır. Bu ifadede her ../, sırasıyla /app, /uploads, /html, ve /www dizinlerinden çıkışı temsil eder ve sonunda kök dizine ulaşılır.
- Sonuç olarak bu testi yaparken `bilesen.php?yol=../../../../../../../../../../../../etc/host&tip=conf` şeklinde bir adrese istek atıyoruz ve `multi on` yanıtını döndüğünü görüyoruz.
- Bunun üzerinde web uygulamasının kaynak kodunu okumak için `bilesen.php?yol=../../../../../../../../../../../../var/www/html/index&tip=php` adresine istek atıyoruz ve index.php sayfasının kaynak kodunu görüntülüyoruz.
- Kaynak kodu incelerken yorum satırı haline getirilmiş bir adres fark etmekteyiz: `<?php //echo "<li><a href="/admin_3_son_guncel_prod_hazir_1453.php">admin</a></li>"; ?>` 
- Bulduğumuz adrese tarayıcıdan ulaşmayı denediğimizde ana sayfaya yönlendiriliyoruz. Ardından HTTP yanıt başlıklarını inceliyoruz ve `302 Found` mesajını görüyoruz.
- Bunun üzerinde daha önceden bulmuş olduğumuz path traversal zafiyetini kullanarak `admin_3_son_guncel_prod_hazir_1453.php` dosyasının kaynak kodunu görüntülüyoruz.
- Admin sayfasının kaynak kodunda flag'i ekrana bastıran bir kod olduğunu görüyoruz ayrıca eğer kullanıcının oturumundaki user değeri admin'e eşit değilse ana sayfaya yönlendirileceği bir koşul yapısı bulunuyor ve bizim de index.php dosyasında gördüğümüz üzere user değerimiz admin'e değil ziyaretçi'ye eşit.
- Admin sayfasının kodunu daha fazla incelediğimizde isteğin yönlendirildiği ancak sonrasında exit() kodu kullanılnadığı için sayfanın geri kalanının da çalıştırılacağını görüyoruz.
- Bu durumda tarayıcımızı burpsuite tarzı bir trafik izleme aracına bağlıyoruz, proxy bölümünden intercept sekmesine geliyoruz ve intercepti aktif hale getiriyoruz.
- Admin sayfasına isteği tekrardan gönderiyoruz ardından burpsuite ekranımıza düşen bu isteğe sağ tıklayarak Do intercept > Response to this request seçeneklerini seçiyoruz ve forward tuşuna basıyoruz.
- Döndürülen isteğin gövdesi incelendiğinde kodun geriye kalanının da çalıştırıldığını ve flag'i görüyoruz.

## Flag
```
BayrakBende{H3r_5eYi_B1LmenE_G3r3k_Y0k_H4dd1n1_BiL_Y3t3r}
```