# 95 Numara
 |    |  |
 | ------------- |-------------|
 | Zorluk        | Orta (350 Puan)|
 | Aşama         | Yarı Final   |
 | Soru Türü     | Tersine Mühendislik |
 | Dosya(lar)    | write.exe |
 | Yazar(lar)    | [Ömer Faruk Sönmez](https://github.com/omertheroot) |
## Soru Metni

```
Bayrak aslında gözünün önünde. Sadece biraz ağırdan al.
```

## Çözüm


write.exe 32 bit bir exe dosyası. Program 5 ayrı thread ile çalışıyor. Bunlardan 4 tanesi writer thread, 1 tanesi reader thread. Write thread sürekli olarak flag.txt dosyasına "bayrak" kelimesini yazarken, reader thread flag.txt dosyasını sürekli olarak okuyor.

Eğer reader thread "bende" kelimesini okursa flag'i yazdırıyor. Yarışmacıdan beklenen, binary'yi analiz edip "bende" kelimesini flag.txt dosyasına yazması gerektiğini anlamak. Ardından reader thread'in "bende" kelimesini okumasını sağlamak. Bunun için birden fazla thread'de çalışan basit bir script yazılması yeterlidir.


```python
import threading

def write_flag():
    while True:
        with open("flag.txt", "w") as f:
            f.write("bende")

threads = []
for _ in range(10):
    t = threading.Thread(target=write_flag)
    t.daemon = True
    threads.append(t)
    t.start()

for t in threads:
    t.join()
```

Bu script flag.txt dosyasına "bende" kelimesini yazdıran 10 ayrı thread oluşturur. Reader thread'in "bende" kelimesini okuması şansını arttırmak için çözüm scriptini write.exe'den önce çalıştırılması gerekmektedir.

## İpucu

```
1. bayrak -> bende
2. Eğer yeterince hızlı olamıyorsan thread sayısını artır ve çözüm scriptini programdan önce çalıştır.
```

## Flag

```
BayrakBende{b3n_h1z1m!}
```
