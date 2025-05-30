# SEO

|    |  |
| ------------- |:-------------:|
| Zorluk        | Kolay(200 Puan)|
| Aşama         | Yarı Final    |
| Soru Türü     | Web |
| Yazar         | [Rednexie](https://github.com/Rednexie) | 


## Soru Açıklaması
```
Çaylak geliştirici bir SEO analizi aracı geliştirmiş. Admin Paneline erişip onu alt edebilecek misin?
```

## İpuçları
```
YOK
```

## Bayrak
```
BayrakBende{l4_f4m1l14_3s_t0d0}
```



# WriteUp


## Sitenin İşlevselliğinin Test ve Analiz Edilmesi

Bize verilen bağlantıda, verdiğimiz linkteki siteye SEO analizi yapan bir web servisinin varlığını görmekteyiz.
Site; Başlıklar, Meta Etiketleri, Resim Alternatif Metinleri, Kullanımdan Kalkmış Özellikler, HTML Yorum Satırları gibi konularda siteyi analiz edip belli bir puanlama yapmaktadır. Ayrıca hizmetin sayfa HTML'ini görüntüleme gibi bir özelliği de mevcuttur.


## Admin Panelinin Keşfi

Sitemizdeki /admin yoluna gittiğimizde, yönetim paneline sadece sunucuyla aynı ağdan yapılan girişlerin kabul edilceceğine dair bir yanıtla karşılaşmaktayız.

# Sunucu Taraflı İsteğin Analizi

Bu web servisinin, verilen bir URL'yi analiz edebilmesi için sunucu taraflı bir istek göndererek URL'den dönen yanıtı analiz etmesi gereklidir. Dolayısıyla istediğimiz URL'ye bu sunucu tarafından istek atılmasını sağlamamız mümkün.

Admin Paneline sadece aynı ağdan yapılan girişlerin kabul edileceğine dair bir çıktı aldığımızdan bahsetmiştik. Admin paneli ile SEO hizmetinin sunulduğu sunucu aynıysa, sunucudan kendine bir istek attırmamız mümkündür. Sunucu kendisi ile aynı ağda olduğu için de admin paneline giriş yapma yetkisi bulunacaktır. 
    
# Zafiyetin Sömrülmesi 

SEO Analizindeki URL kısmına, admin panelini görüntülemek için localhost/admin girdiğimizde, html görüntülenme kısmında bize bayrak dönecektir.
