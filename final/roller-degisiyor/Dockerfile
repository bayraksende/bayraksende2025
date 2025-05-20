FROM node:18-alpine

# Çalışma dizinini ayarla
WORKDIR /app

# Bağımlılıkları kopyala ve yükle
COPY package*.json ./
RUN npm install

# Uygulama kodlarını kopyala
COPY . .

# Flag'i environment variable olarak tanımla
ENV FLAG="BayrakBende{bu_s3f3r_s4n4l_4dm1n_l1nkl3r3_t1kl4m1y0r}"

# Port ayarı
EXPOSE 3000

# Uygulamayı başlat
CMD ["node", "app.js"]