const express = require('express')
const router = express.Router()
const filterRoutes = require('./filter')
const coinRoutes = require('./coin')
const authRoutes = require('./auth')
const adminRoutes = require('./admin')

router.use('/filter', filterRoutes)
router.use('/coin', coinRoutes)
router.use('/admin', authRoutes)
router.use('/admin', adminRoutes)

module.exports = router