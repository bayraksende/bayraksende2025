const express = require('express')
const router = express.Router()
const path = require('path')
const { generateExpiresHeader } = require('../../lib/cache.js')
const ejs = require('ejs')
const cache = require('../../lib/cache.js')
const { getUserbyCookie, getCookiebyUser} = require('../auth/repository.js')




router.get('/blog', async (req, res) => {
    let user = await getUserbyCookie(req.cookies['cibrx-session'])
    if (user) {
        res.setHeader('Cache-Control', 'max-age=30')

        const host = req.headers['x-forwarded-host'] || req.headers['host']

        if(cache.has('/blog')){
            res.setHeader('X-Cache', 'hit')
            res.setHeader('Age', Math.round((Date.now() - cache.get('blog-time')) / 1000))
            return res.type('html').send(cache.get('/blog'))
        }
        else{
            ejs.renderFile('./views/blog.ejs', {host}, {}, (err, html) => {
                res.setHeader('X-Cache', 'miss')
                res.setHeader('Age', '0')
                cache.set('/blog', html)
                cache.set('blog-time', Date.now())
                cache.expire('/blog', 30 * 1000)


                if(err) console.error(err)
                else {
                    res.type('html').send(html)
                }
            })
        }

    } else {
        res.redirect('/auth/login')
    }
})


router.prefix = "/"
module.exports = router