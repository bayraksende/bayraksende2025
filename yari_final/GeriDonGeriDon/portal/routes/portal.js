const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const ADMIN_DOMAIN = process.env.ADMIN_DOMAIN;

router.get('/', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render('portal.ejs', { host: ADMIN_DOMAIN });
});

router.post('/geribildirim', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Oturum kapalı' });
    }
    const { feedback } = req.body;
    if (!feedback || feedback.trim() === '' || feedback.length < 1) {
        return res.status(400).json({ error: 'Eksik bilgi' });
    }

    const feedbackFilePath = path.join(__dirname, '../feedback.html');
    fs.writeFile(feedbackFilePath, feedback + '\n', (err) => {
        if (err) {
            console.error('Dosyaya geri bildirim yazılırken hata oluştu:', err);
            return res.status(500).json({ error: 'Dahili sunucu hatası' });
        }
    });

    console.log('Feedback:', feedback);
    res.json({ success: true });
});

router.get('/geribildirim', (req, res) => {
    const feedbackFilePath = path.join(__dirname, '../feedback.html');
    res.sendFile(feedbackFilePath, (err) => {
        if (err) {
            console.error('Dosya gönderilirken hata oluştu:', err);
            res.status(500).send('Dahili sunucu hatası');
        }
    });
});

module.exports = router;
module.exports.prefix = '/';
