FROM node:22

ENV ADMIN_DOMAIN="soru.bayraksende.com:1453"
ENV FLAG="BayrakBende{B4yr4kB3nd34dm1nl3r1TumL1nkl3r3T1kl1y0r}"

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]