const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../lib/sequelize.js');
const Users = require('../models/users');
const Session = require('../models/session.js');
const ADMIN_DOMAIN = process.env.ADMIN_DOMAIN;
const FLAG = process.env.FLAG
let bakiye;

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await Users.findOne({ where: { username, password } });

    if (user) {
        req.session.user = user.username;
        req.session.name = user.name;
        req.session.surname = user.surname;
        req.session.email = user.email;
        req.session.position = user.position;
        req.session.bakiye = user.bakiye;
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, message: 'Geçersiz kullanıcı adı veya parola' });
    }
});

router.get('/profil', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    const session = await Session.findOne({ where: { cookie: req.session.id } });

    if(session.bakiye >= 100000) {
        bakiye = FLAG;
    } else {
        bakiye = session.bakiye;
    }

    res.render('profile.ejs', { 
        sessionId: session.id,
        username: req.session.user,
        name: req.session.name,
        surname: req.session.surname,
        email: req.session.email,
        position: req.session.position,
        bakiye: bakiye.toLocaleString('tr-TR'),
        host: ADMIN_DOMAIN,
    });
});

router.get('/kontrol', (req, res) => {
    if (req.session.user) {
        Session.create({ cookie: req.session.id, bakiye: 1453});
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Oturum kapatılamadı' });
        }
        res.json({ success: true });
    });
});

module.exports = router;
module.exports.prefix = '/';