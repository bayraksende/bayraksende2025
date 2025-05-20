# Karınca
 |    |  |
 | ------------- |-------------|
 | Zorluk        | Orta (350 Puan)|
 | Aşama         | Yarı Final   |
 | Soru Türü     | Betik |
 | Yazar(lar)    | [Ömer Faruk Sönmez](https://github.com/omertheroot) |
## Soru Metni

```
0 yada 1, işte bütün mesele bu!
```

## Çözüm

"karinca.mp4" 24 fps 100x100 bir mp4 videodur. Video sadece siyah ve beyaz pixellerden oluşmaktadır. Yarışmacıdan istenen beyaz pixeller 0, siyah pixeller 1 olacak şekilde veriyi bir dosyaya yazmasıdır. Ayrıca bunu yaparken compression'ı da hesaba katıp tam siyah veya tam beyaz olmayan renkleri de algılaması gerekmektedir. Bunun için ffmpeg, opencv, pillow gibi kütüphaneler kullanılabilir. Çözüm dosyasında ffmpeg ile dosyanın her bir frameini resim haline getirip pillow kütüphanesi ile renk okuma işlemi yapılmıştır. İşlem sonucunda flag.png dosyasındaki görsel ortaya çıkmaktadır.

## İpucu

```
1. beyaz -> 0, siyah -> 1
```

## Flag

```
BayrakBende{0lmak_y4da_0lm4mak!}
```