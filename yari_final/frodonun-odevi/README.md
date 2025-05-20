# Frodo'nun Ödevi

 |    |  |
 | ------------- |-------------|
 | Zorluk        | Kolay (200 Puan)|
 | Aşama         | Yarı Final   |
 | Soru Türü     | Misc |
 | Dosya(lar)    | kurallar.zip |
 | Yazar(lar)    | [Ömer Faruk Kaplan](https://github.com/ofkaplan) |

## Soru Metni

```
Ömer, Ctf sorusu yazma ödevi için uyması gereken kuralların bulunduğu pdf dosyasını
ziplemiştir. Ömer zip dosyasının şifresini unutmuştur. Şifreye dair hatırladığı ipuçları şunlardır:
1. Şifre 7 hanelidir
2. Şifre büyük harf, küçük harf ve rakam türünde karakterler içerir.
3. Şifrede yalnızca bir adet küçük harf bulunur.
4. Şifrenin yalnızca ilk iki karakteri rakamdır.
5. Şifreden rakamlar atıldığında oluşan ifadenin ortasındaki karakter tür olarak diğer
karakterlerden farklıdır.
```

## Çözüm

Şifre formatı belli olduğu için zip dosyasına herhangi bir brute force aracı ile brute force atılacaktır.
Brute force sonucunda şifre "62AOgTS" çıkmaktadır.

Zip dosyasının içinden çıkan kurallar.pdf dosyasının metadatasında flag bulunmaktadır.

## Flag

```
BayrakBende{BuKadarKolayOlamazdıZaten}
```
