const express = require('express')
const router = express.Router()
const filterRoutes = require('./filter')
const coinRoutes = require('./coin')

router.use('/filter', filterRoutes)
router.use('/coin', coinRoutes)

module.exports = router