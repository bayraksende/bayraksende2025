const express = require('express')
const router = express.Router()
const path = require('path')


router.get('/', (req, res) => {
    if(!req.session.username) {
        res.redirect('/auth/login')
    } else {
        res.render('profile.ejs', { username: req.session.username })
    }
})


router.prefix = "/profile/"
module.exports = router