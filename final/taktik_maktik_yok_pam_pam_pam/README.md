# Taktik maktik yok pam_pam_pam
```
Aşama: Final
Kategori: Tersine Mühendislik
Zorluk: Orta (350 puan)
Dosya(lar): pam_unix.so
```
## Soru Metni

```
Sunucumuzda bir backdoor olduğunu düşünüyoruz. Dosya imzalarını kontrol ettiğimizde, pam_unix.so dosyasının imzasının değiştiğini fark ettik.
```

## Çözüm

```
pam_unix.so reverse edilerek içinden "lirililarila" şifresi çıkarılır. root kullanıcısı ve "lirililarila" şifresi ile ssh ile giriş yapılır.

Çalışan servislere bakıldığında redis sunucusunun çalıştığı görülür. redis-cli ile "KEYS *" komutu ile tüm anahtarlar listelenir. 

GET flag komutu ile flag alınır.
```

## İpucu

```
1. redis
```

## Flag

```
BayrakBende{p0rtlar1_k4patal1m_g3ncl1k}
```
