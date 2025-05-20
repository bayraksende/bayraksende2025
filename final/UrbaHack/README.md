# UrbaHack

 |    |  |
 | ------------- |-------------|
 | Zorluk        | A.G (1500 Puan)|
 | Aşama         | Final   |
 | Soru Türü     | Misc |
 | Yazar(lar)    | [Ömer Faruk Sönmez](https://github.com/omertheroot), [Metehan Ören](https://github.com/smurfs3) |



## Soru Metni

```
Urba K1 akıllı kalp pilini test edebilir misin?
```

## Çözüm

Her yarışmacının masasına bir adet raspberry pi bıraktık. Masalara bıraktığımız kağıtlarda raspberrylerin AP'lerinin ssid ve parolaları bulunuyordu. Ağa dahil olduktan sonra gateway adresinde bir web panel vardı.
<br><br>
Web paneldeki log indirme requestinde XXE açığı bulunuyordu. Bunu kullanarak urbatek kullanıcısının ssh private keyi alınır.
SSH'a girildikten sonra cihazdaki backdoor fark edilir. Reversledikten sonra bir adet login sayfası ve bir adet mail hesabı ve şifresi bulunur.
<br><br>
Login sayfası bir C2 paneli loginidir. Kayıt olma kısmında register@urbatek.tr adresinde admin olarak mail atarak yeni bir admin hesabı açabileceğimiz yazmaktadır. Bize verilen test hesabını spooflayarak admin gibi mail atıyoruz.
<br><br>
Giriş yaptıktan urbatek'in instagram'daki reelsinde tahtada görünen /urb07test pathine gidince bizi bir sürpriz ve flag karşılamaktadır.

## Flag

```
BayrakBende{Urba_H4ck3d!}
```
