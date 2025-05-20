
# Soru Çözümü 

Öncelikle Olarak Sorumuzda Sezar Şifreleme Var Yapılması Gereken Sağ Alttaki Değere göre işlem yapmalı. Ama öncesinde decompile edip kullanıcı adı ve şifreyi almalı.

```javascript
public final class MainActivity extends AppCompatActivity {
    private final String ADMIN_USERNAME = "ctf_admin";
    private final String ADMIN_PASSWORD = "s3cr3t_p4ssw0rd";

```


```javascript
jlcoldqdkwduvliuh
```


Çözümü Basittir Kullanıcı sezar algoritması kullanarak gizli anahtar için 3 harf geri kaydırarak sonuca ulaşır

![Uygulama Ekran Görüntüsü](https://github.com/user-attachments/assets/62ae4a10-8480-4490-82d3-2c8413e1ff68)


![Uygulama Ekran Görüntüsü](
https://github.com/user-attachments/assets/8602b921-8d0d-4f1d-831a-c68d8ef5df63)
