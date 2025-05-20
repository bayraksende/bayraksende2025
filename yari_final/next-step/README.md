# Ortadaki Adam

 |    |  |
 | ------------- |-------------|
 | Zorluk        | Orta (350 Puan)|
 | Aşama         | Yarı Final   |
 | Soru Türü     | Web Güvenliği |
 | Yazar(lar)    | [Ömer Faruk Sönmez](https://github.com/omertheroot) |

## Soru Metni

```
Operasyonun sıradaki aşaması ne? 👽
```

## Çözüm

Web uygulamasında ana sayfa, login sayfası ve protected bir route olan flag sayfası bulunmaktadır. Uygulamada giriş yapmak imkansızdır.

SQLi, Brute force gibi teknikler işe yaramayacaktır. Dikkat çekilmek istenen nokta uygulamanın meta headerlerinde ve response headerlerinde kullanılan frameworkün Next.js, versiyonunun ise 14.1.0 olduğudur. Yakın zamanda patlak veren CVE-2025-29927 numaralı güvenlik açığına dikkat çekilmek istemektedir. 15.x versiyonlarda 15.2.3'ten öncesi, 14.x versiyonlarda 14.2.25 öncesi ve 13.5.6'dan 11.1.4'e kadar tüm versiyonlarda bulunan bu açık, middleware'ların hepsini bypass'lamayı sağlayan bir bug bulunduruyor.

Bu bug'ı tetikletmek için ise atılan request'e "X-Middleware-Subrequest" headerini dahil edip spesifik bir payload yollamak yeterli oluyor:
```
X-Middleware-Subrequest: src/middleware:nowaf:src/middleware:src/middleware:src/middleware:src/middleware:middleware:middleware:nowaf:middleware:middleware:middleware:pages/_middleware
```

Bu şekilde /flag sayfasına girdikten sonra flag karşımızda oluyor

## İpucu

```
1. Middleware Subrequest 
```

## Flag

```
BayrakBende{0p3rasy0nun_s0nrak1_as4mas1_ne?}
```