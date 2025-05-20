const service = require('./service')
const { validationResult } = require('express-validator')
const repository = require('./repository.js')
const crypto = require('crypto')
const { getUserbyCookie, getCookiebyUser} = require('../auth/repository.js')



const register = async (req, res) => {
    // input validation
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array().map(error => error.msg)  })
    }

    const result = await service.register(req.body)

    res.status(result.status).json(result.jsonData)
}

const login = async (req, res) => {

    // input validation
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array().map(error => error.msg) })
    }

    const result = await service.login(req.body)

    if (result.status == 200) {
        const {cookie} = await getCookiebyUser(req.body.username)
        res.cookie('cibrx-session', cookie, {
            maxAge: 1000 * 60 * 60, // 1 saat
            httpOnly: false,        // Sadece HTTP üzerinden erişilebilir
            secure: false,          
        });
    }

    res.status(result.status).json(result.jsonData) // bu response döndü mü
    
}

module.exports = {
    register,
    login
}