# B3T1K

 |    |  |
 | ------------- |-------------|
 | Zorluk        | Orta (350 Puan)|
 | Aşama         | Yarı Final   |
 | Soru Türü     | Networking |
 | Dosyalar      | B3T1K.pcapng |
 | Yazar(lar)    | [Selim Günal](https://github.com/selimgunall) |



## Soru Metni

```
Bir X şirketinde ağ güvenlik uzmanı olarak çalışan Mustafa, bilgisayarının ağ trafik kayıtlarını incelerken garip bir şey fark ediyor. 
```

## Çözüm

Verilen .pcapng dosyasında ftp trafiği görmekteyiz FLAG.png adı bir dosya trasfer edilmektedir. Bu dosyayı Wireshark yardımıyla kolayca çıkarabiliriz.
<br>
Wireshark->File->Export Objects->FTP-Data ve Save dememiz yeterli. Sonra elimizdeki FLAG.png dosyasının metadatasını exiftool yardımıyla incelediğimizde orda bizi bir youtube videosuna yönlendirmekte "https://www.youtube.com/watch?v=cnusB8XE4Eg" videonun açıklamasında flag yer almaktadır.

## Flag

```
BayrakBende{betigiokuyun}
```
