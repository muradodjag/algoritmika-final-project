
const express = require('express')
const router = express.Router()
const AuthService = require('../services/auth')
const { Admin } = require('../models')
const config = require('../config')

const authService = new AuthService(Admin)

router.post('/signin', async (req, res) => {
    try {
        const { login, password } = req.body
        const { token, userData } = await authService.signin(login, password)
        res.cookie('token', token, { maxAge: 3600000, httpOnly: true, sameSite: config.COOKIE_SAME_SITE, secure: config.COOKIE_SECURE })
        res.json({ auth: true, user: userData /** token: token **/ })
    } catch (err) {
        res.status(401).send({ auth: false, token: null, message: err.message })
    }
})


router.post('/signup', async (req, res) => {
    try {
        const { login, password } = req.body
        await authService.signup({ login, password })
        res.status(201).json({ login })
    } catch (err) {
        res.status(400).send(err.message)
    }
})



module.exports = router