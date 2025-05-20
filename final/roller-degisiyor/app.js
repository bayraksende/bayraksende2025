const express = require('express');
const session = require('express-session');
const path = require('path');
const _ = require('lodash');

const app = express();
const port = 3000;

app.set('view engine', 'ejs'); // EJS şablon motorunu kullan
app.set('views', path.join(__dirname, 'views')); // EJS dosyalarının bulunduğu klasör

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const users = [
    { name: 'zigzantares', password: 'geridonn'},
    { name: 'admin', password: Math.random().toString(32), isAdmin: true },
];

let messages = [];
let lastId = 1;

app.put('/message', (req, res) => {
    const user = users.find(u => u.name === "zigzantares");

    const message = {
        text: "Her sakallıyı xss sanma!",
        icon: "😈"
    };

    console.log(req.body.message);
    console.log(user.name);
    _.merge(message, req.body.message, {
        id: lastId++,
        timestamp: Date.now(),
        userName: user.name,
    });

    console.log(message);
    messages.push(message);
    res.send({ ok: true });
});

app.get('/admin', (req, res) => {
    const user = users.find(u => u.name === "zigzantares");
    console.log(user);
    if (!user || !user.isAdmin) {
        res.status(403).send('Forbidden!');
        return;
    }
    res.render('admin', { 
        messages,
        flag: process.env.FLAG 
    });
});

app.get('/dev.txt', (req, res) => {
    res.sendFile(path.join(__dirname, 'dev.txt'));

});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});