const { body } = require('express-validator')

const validateUserCreation = [
    body('username').isLength({ min: 6}).withMessage('Kullanıcı adı en az 6 karakter olmalı.'),
    body('password').isLength({ min: 6}).withMessage('Parola adı en az 6 karakter olmalı.')
]

const validateUserLogin = [
    body('username').isLength({ min: 6}).withMessage('Kullanıcı adı en az 6 karakter olmalı.'),
    body('password').isLength({ min: 6}).withMessage('Parola adı en az 6 karakter olmalı.')
]


module.exports = {
    validateUserCreation,
    validateUserLogin,
}