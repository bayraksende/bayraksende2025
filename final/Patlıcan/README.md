# Patlıcan
|    |  |
| ------------- |-------------|
| Zorluk        | Zor (500 Puan)|
| Aşama         | Final    |
| Soru Türü     | Stego |
| Dosyalar      | URBA Y1.jpg |
| Yazar(lar)    | [Oğuzhan Akay](https://github.com/oguzhanakayy) |

## Soru Metni

```
Urba Y1 ileri teknolojili şık bir akıllı yüzüktür.
```

## Çözüm

```
Urba y1 adında bir görsel veriliyor. Bu resmi inceliyoruz ve steghide aracına atıp inceliyoruz. İnceleme bittiğinde görselin içinden bir txt dosyası çıkıyor. Txt dosyasının içeriği:

Ahmet Bey yüzüğün çektiği fotoğraflar zip te. Şifresini ve yerini zaten biliyosun. Unutma bu bir secret. He bide şu sözü de ekliyim ben çok seviyorum: Her site göründüğü gibi değildir; kimi sırları saklar, kimi sır olur zaten.” – Eski bir dost

Burda çıkarmamız gereken anlam bir sitenin oldugu ve bir şey sakladıgı. sakladıgı şeyinde 3. satırda dikkat çeken "secret" kelimesinin oldugu. Yani bir site ve secret kalıyor. Site olarak bize verilen tek site URBATEK in sitesi. Burdan urbatek.tr/secret adresine gidiyoruz. Bizi bir docx dosyası ve şifreli bir rar dosyası karşılıyor. Docx i açtıgımızda matematiksel bir algoritma çıkıyor bunu çözüp rar dosyasının şifresine deniyoruz ama olmuyor. Burda docx dosyasının yapısını incelememiz gerektiğini anlayıp .docx i .zip yapıp açıyoruz karşımıza farklı klasörler çıkıyor. word klasörüne girdiğimizde birden fazla .xml dosyasıyla karşılaşıyoruz ve bunlardan document.xml in içine baktıgımızda yorum satırı olarak şifreyi görebiliyoruz. rar ın şifresinide girdikten sonra karşımıza urbay1 ile çekilmiş 4 farklı resim çıkıyor resimlerin tek tek metadatasını inceledikten sonra birinde bir drive linki görüyoruz. Drive da bizi 4 farklı qr parçası karşılıyor hepsini birleştiriyoruz ve yeni bir drive linkiyle daha karşılaşıyoruz. Bu linkte ise bir .exe dosyası var. Exe yi açtıgımızda bizden bir şifre istiyor ama burdaki esas amaç bunu reverse lemek değil herhangi bir hex aracıyla hex ine bakmak. hex ine bakınca da 3 parçaya ayrılmış flag ile karşılaşıyoruz.
```

## İpucu

```
1. Docx mi o da ne 
2. object obejct
```

## Flag

```
BayrakBende{B3N_ST3G0YUM}
```
