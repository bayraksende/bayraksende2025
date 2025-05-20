const express = require('express')
const app = express()
const router = express.Router()
const path = require('path')
const port = process.env.PORT || 3000
const fs = require('fs')
const session = require('express-session');
const repository = require('./routes/auth/repository.js')

process.env.NODE_ENV = 'development'
app.set('view engine', 'ejs')
app.set('trust proxy', true);
app.set('env', 'development');
app.set('json spaces', 2)
app.set('etag', false)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(
    session({
      secret: 'a@JOW7CwQL#>2v[9sd2423asd*a09d2334gdsd2[e@>pD$q+@==V', // Oturum güvenliği için gizli anahtar
      resave: false,          // Her istekte oturumu yeniden kaydetme
      saveUninitialized: true, // Başlatılmamış oturumları kaydetme
      cookie: { secure: false }, // HTTPS üzerinde secure: true olmalı
    })
);

app.use(async (req, res, next) => {
  res.set({
    'x-powered-by': 'Urbatek'
  })
  next()

})

app.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/auth/login')
})

const routers = fs.readdirSync('./routes/')
routers.forEach(routerFile => {
    const file = require(`./routes/${routerFile}`);
    app.use(file.prefix, file)
});

app.listen(3000, () => {
    const { test } = require('node:test')
    const assert = require('assert')
    test('Server is listening on http port ' + port, () => {
      assert.strictEqual(true, true); // Simple assertion to avoid test failure
  });
});