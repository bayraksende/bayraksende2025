# Yüzüklerin Efendisi
|    |  |
| ------------- |-------------|
| Zorluk        | Zor (500 Puan)|
| Aşama         | Final    |
| Soru Türü     | Web Güvenliği |
| Yazar(lar)    | [İbrahim CAN](http://github.com/cibrx) |
## Soru Metni

```
Yüzüklerin Efendisi olmana tek bir adım kaldı: Akıllı Yüzüğü Satın Al
```

## Çözüm

```
Soru Açıklaması ve İlk Adımlar
Verilen CTF senaryosunda, satın almamız gereken ürün akıllı yüzük idi. Soruda doğrudan belirtilmese de, siteyi incelediğimizde satın alma işlemi için bir kupon kodu kullanmamız gerektiğini gördük.

1. Siteyi Keşfetme ve Kupon Kodunu Bulma
Siteye girdiğimizde, akıllı yüzüğün de bulunduğu sağlık ürünleri listeleniyordu.
Sepete veya profil sayfasına erişmek için bir kullanıcı hesabı oluşturmamız gerekiyordu.
Kayıt olup giriş yaptıktan sonra, profil sayfamızda adımızın yanında hosgeldin1000 adlı kupon kodunu gördük.
2. Alışveriş Kurallarını Anlama
Sepete gittiğimizde, henüz eklenmiş bir ürün olmadığını gördük.
Sayfanın altındaki açıklamalarda, alışverişin yalnızca kupon kodları ile yapılabileceği belirtiliyordu.
Ancak asıl sorun, akıllı yüzüğün fiyatının 1092.25₺ olması, elimizdeki kupon kodunun ise sadece 1000₺ değerinde olmasıydı.
Burada iki seçenek vardı:

Daha yüksek değerli bir kupon kodu bulmak veya üretmek.
Sistemin integer overflow zafiyetini kullanarak kupon değerini değiştirmek.
İkinci yöntemi denemeye karar verdik.

Integer Overflow ile Kupon Değerini Aşmak
Sistemin kupon kodlarını nasıl sakladığını anlamak için, büyük ve negatif değerlerle testler yaptık. Bu testler sonucunda, sistemin 16-bit unsigned integer kullanıyor olabileceğini fark ettik.

1. 16-bit Unsigned Integer Özelliği
16-bit unsigned integer maksimum 65,535 değerine ulaşabilir.
Eğer bu değer aşılırsa, 0’a döner (çünkü 65,536 ≡ 0 (mod 65,536) olur).
2. Overflow İçin Kupon Değerini Aşma
Kupon değerimiz 1000₺ idi.
Eğer sisteme 65,536₺ veya daha büyük bir değer ekleyebilirsek, sayı sıfıra dönecekti.
65,536 - 1000 = 64,536 miktarında ekstra bir değer ekleyerek, kupon değerimizi sıfırlayabiliriz.
Bu durumda, sepete eklediğimiz herhangi bir ürünün fiyatını kontrol edebilirsek, istediğimiz aralığa düşürebiliriz.

Sepete Ekstra Ürün Ekleyerek İstenen Aralığa Düşürme
Kuponumuz integer overflow nedeniyle sıfırlandığında, sistemde 0₺ ile 1000₺ arasında bir değer oluşması gerekiyordu.
Ancak, doğrudan 1092.25₺’yi karşılayacak kadar bir kupon değerimiz yoktu.
Çözüm olarak sepete düşük fiyatlı bir ürün ekledik.
Örneğin:

1092.25₺ olan yüzüğe ek olarak, 920₺ değerinde bir başka ürün ekledik.
Böylece toplam fiyat 1092.25 + 920 = 2012.25₺ oldu.
Kupon sistemimiz taşma yaparak 2012.25 - 65,536 = 1000₺ civarına geldi ve işlemi tamamladık.
Böylece, integer overflow kullanarak satın alma işlemini gerçekleştirmiş olduk.


```

## İpucu

```
1. 65535
```

## Flag

```
BayrakBende{B4rd4g1_T4s1r4n_S0n_D4ml4}
```
