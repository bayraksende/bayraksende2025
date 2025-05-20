const express = require('express')
const router = express.Router()
const controller = require('./controller')
const path = require('path')
const { validateUserCreation, validateUserLogin } = require('../../models/authValidation')


router.post('/register', validateUserCreation, controller.register)
router.post('/login', validateUserLogin, controller.login)


router.prefix = "/auth/"
module.exports = router