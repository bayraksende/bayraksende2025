const express = require('express')
const router = express.Router()
const path = require('path')
const ejs = require('ejs')
const { getUserbyCookie } = require('../auth/repository.js')

process.env.FLAG = 'BayrakBende{B3n_d3_c4l1s1y0rum@9f#L8z&2$}';
const foolflag = 'BayrakBende{4yt_f1z1k_c0zmeye_b3nzemez_4b1ler}';
const flag = process.env.FLAG

router.get('/profile', async (req, res) => {
    if(!req.cookies || !req.cookies['cibrx-session']) return res.redirect('/auth/login')
    let { user, cookie } = await getUserbyCookie(req.cookies['cibrx-session'])
    if(user === 'administrator'){
        res.render('./profile.ejs', { user, flag, role: 'Yazar', pub:'97', followers:'242', readers: '4607' })
    }
    else if (user) {
        res.render('./profile.ejs', { user, flag: foolflag, role: 'Okuyucu', pub:'0', followers:'0', readers: '0' })
    } else {
        res.redirect('/auth/login')
    }
})

router.prefix = "/"
module.exports = router