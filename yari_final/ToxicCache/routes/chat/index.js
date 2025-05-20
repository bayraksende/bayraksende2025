const express = require('express')
const router = express.Router()
const path = require('path')
const ejs = require('ejs')

router.get('/chat', (req, res) => {
    res.render('./chat.ejs')
})

router.prefix = "/"
module.exports = router