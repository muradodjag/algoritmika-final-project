
const express = require('express')
const router = express.Router()
const AuthService = require('../services/auth')
const { User } = require('../models')
const config = require('../config')

const authService = new AuthService(User)

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body
        const { token, userData } = await authService.signin(email, password)
        res.cookie('token', token, { maxAge: 3600000, httpOnly: true, sameSite: config.COOKIE_SAME_SITE, secure: config.COOKIE_SECURE })
        res.json({ auth: true, user: userData /** token: token **/ })
    } catch (err) {
        res.status(401).send({ auth: false, token: null, message: err.message })
    }
})

module.exports = router