# Metin Girin...

|    |  |
| ------------- |:-------------:|
| Zorluk        | Kolay(200 Puan)|
| Aşama         | Yarı Final    |
| Soru Türü     | Web |
| Yazar         | [Rednexie](https://github.com/Rednexie) |
 

## Soru Açıklaması
``` 
Gelip geçen herkesin metin girdiği bu platformdaki ilk dosyanın kodunu okuyabilir misin? Ama dikkat et, metinler şifreli.
```

## İpuçları
```
$oid _id
__v
```

## Bayrak
```
BayrakBende{T4r1hd3rs1d3ğ1l4m4_4t4türkl3rk4ğ1d1md4}
```


# WriteUp 

## Sistemin Anlaşılması
Elimizde, metin girmemize ve bu metinleri bize verilen linkler sayesinde insanlarla paylaşmamıza yarayan bir platform var. Bu platformu kullanırken giden istekleri incelediğimizde, JSON tipinde dönen yanıtların hepsinde '_id' ve '__v' alanları var. Bu alanları ve değerlerini incelediğimizde, sunucuda veritabanı olarak mongodb kullanılıyor olması ihtimalini düşünebiliriz. Ayrıca isteklerimizdeki JSON tipinde giden verilerde de '_id' alanı olmasıi ayrıca sunucu yanıt başlıklarında sunucunun yazıldığı yazılım kütüphanesini ifade eden 'x-powered-by' başlığının değerinin express olması, Express.js ile MongoDB kütüphanesinin kullanılıyor olduğunu bize kanıtlar niteliktedir.
## Potansiyel Güvenlik Açıklarının Analizi
Metin paylaşma ile ilgili olan bu uygulamada, potansiyel olarak 2 tane güvenlik açığının oluşması daha muhtemeldir:
1. Veritabanında saklanıyorsa injection açıkları.
2. Metinler gerçekten sunucu işletim sisteminde birer dosya olarak saklanıyorsa, path traversal.
(Host Header Injection da düşünülebilir, ancak url gösterilen yerlerde istemci taraflı javascript kodu ile alındığı, sayfa kodu incelenirse fark edilebilir.)

İlk seçenek bize daha olası görünmektedir, çünkü:

1. Yanıt ve isteklere baktığımızda metinlerin JSON yanıtlarında, MongoDB kullanıldığına dair kanıtlar bulunmaktadır.
2. Kullanıcıdan direkt olarak MongoDB Object Id'leri(_id) alan, ve bunu sorgulamalarda kullanan, hatta daha da kötüsü kullanıcıya __v ve _id değerlerini alan adlarını bile değiştirmeden döndüren bir geliştiricinin veritabanı güvenliği hakkında pek bir bilgisi olduğu söylenemez.

Ayrıca ilk zafiyetin bulunmasının söz konusu olmadığını aynı isimde birden fazla dosya oluşturabilmemizden anlayabiliriz.

## Zafiyetin Bulunduğu Yerin Belirlenmesi ve Sömürülmesi

Bizden alınan JSON nesnesi ile sorgulama yapılan tek yer, şifre kontrolünün yapıldığı dizin olan /verify-password adresine giden POST isteğidir. Bu nesnedeki _id ve password ile sorgulama yapılmaktadır. İçinde password alanı olmayan bir istek gönderdiğimizde istek nesnesinde doğrulama yapılmadığı, sadece verilen alanlar ile sorgulama yapılıp eşleşen bir sonuç olmadığına bakıldığı anlaşılır. 

NoSQL Injection için özel bir sorgu oluşturup, MongoDB'nin greater than operatörünü _id alanı için kullandığımızda dolu bir string boş bir stringden büyük olacağı için bize ilk dökümanı verecektir.

```json
{
  "_id": { "$gt": "" }
}
```

POST isteğini aşağıdaki gövde ile gönderdiğimizde, bize ilk döküman yanıt olarak dönecektir:
```json
{
    "_id": "xxxxxx",
    "content": "BayrakBende{T4r1hd3rs1d3ğ1l4m4_4t4türkl3rk4ğ1d1md4}",
    "__v": 0
}
```
