const express = require('express');
const app = express();

const db = require('./lib/sequelize.js');
const fs = require('fs');
const session = require('express-session');
const port = 3000;
const ejs = require('ejs');

app.set('view engine', 'ejs')
app.set('trust proxy', true);
app.set('json spaces', 2)
app.set('etag', false)

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))
app.use(
    session({
      secret: 'a@JO2W7CAd2wQ361asd*a09d2334g13dsd2[e@>pD$q+@==V', // Oturum güvenliği için gizli anahtar
      resave: false,          // Her istekte oturumu yeniden kaydetme
      saveUninitialized: true, // Başlatılmamış oturumları kaydetme
      cookie: { secure: false }, // HTTPS üzerinde secure: true olmalı
    })
);

const userRoutes = require('./routes/users.js');
const portalRoutes = require('./routes/portal.js');

app.use(userRoutes.prefix, userRoutes);
app.use(portalRoutes.prefix, portalRoutes);

app.use(async (req, res, next) => {
    res.set({
      'x-powered-by': 'Urbatek'
    })
    next();
  
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
})

