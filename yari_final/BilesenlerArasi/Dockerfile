# PHP resmi imajını kullan
FROM php:8.1-cli

# Çalışma dizinini ayarla
WORKDIR /var/www/html
ENV FLAG = "BayrakBende{H3r_5eYi_B1LmenE_G3r3k_Y0k_H4dd1n1_BiL_Y3t3r}"
# Gerekli dosyaları kopyala
COPY . .

EXPOSE 80
# PHP'nin yerleşik web sunucusunu başlat
CMD ["php", "-S", "0.0.0.0:80", "-t", "."]
