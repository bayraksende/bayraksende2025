FROM node:22

ENV ADMIN_COOKIE="AsUt_rT0a2feB5Nxk3Gsd_MQ7So1PJtOddasdWDo65.icuAAaLxR5u441O8IKZw9BdMG9JXgrFOhrLiot18ZbAkpss"
ENV DB_PASSWORD="cibrxpass123"

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]