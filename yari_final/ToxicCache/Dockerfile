# Base image olarak Node.js resmi imajını kullan
FROM node:20

# Çalışma dizinini oluştur
WORKDIR /app

# Puppeteer ve gerekli bağımlılıkları yükle

# package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install && apt update -y

# Uygulama kodunu kopyala
COPY . .

EXPOSE 3000

# Uygulamayı çalıştır
CMD ["npm", "start"]