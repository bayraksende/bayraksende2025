const express = require('express');
const app = express();
const fs = require('fs');
const port = 3000;
const ejs = require('ejs');
const toplamBakiye = 0;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const Session = require('./models/session.js');
const Users = require('./models/users.js');
const ADMIN_COOKIE = process.env.ADMIN_COOKIE;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.redirect('/admin');
});

app.get('/admin', (req, res) => {
    res.render('admin.ejs', { toplamBakiye });
}); 

app.get('/api/calisanlar', async (req, res) => {
    console.log(req.cookies['urbatek']);
    console.log("admin cookie:"+ADMIN_COOKIE);
    if (req.cookies['urbatek'] !== ADMIN_COOKIE) {
        return res.status(401).json({ error: 'Giriş yapmanız gerekiyor.' }); // Login yapılmamışsa
    }
    await Users.findAll()
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Veritabanı hatası' });
        });
});


app.get('/test', (req, res) => {
    res.send(req.session)
});

app.post('/api/bakiye-gonder', async (req, res) => {
    if (req.cookies['urbatek'] !== ADMIN_COOKIE) {
        return res.status(403).json({ error: 'Bu işlemi yapmak için yetkiniz yok.'}); // Admin değilse
    }

    const { id, bakiye } = req.body;
    if (!id || !bakiye) {
        return res.status(400).json({ error: 'Eksik bilgi' });
    }

    const session = await Session.findOne({ where: { id: id } });
    if (!session) {
        return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }
    
    await Session.update(
        { bakiye: session.bakiye + parseInt(bakiye, 10) },
        { where: { id: id } }
    );
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});