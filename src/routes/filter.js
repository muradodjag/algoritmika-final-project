const express = require('express')
const router = express.Router()
const FilterService = require('../services/filter')
const { Coin } = require('../models')

const filterService = new FilterService(Coin)

router.get('/info', async (req, res) => {
    try {
        const country = await filterService.getInfo('country')
        const quality = await filterService.getInfo('quality')
        const metal = await filterService.getInfo('metal')
        res.json({
            country: country,
            quality: quality,
            metal: metal
        })
    }
    catch (err) {
        res.status(400).send(err)
    }
})

router.get('/', async (req, res) => {
    try {
        const coins = await filterService.getCoins(req.query)
        const count = await filterService.getCount()
        res.json({ coins: coins, count: count })
    } catch (err) {
        res.status(400).send(err.message)
    }
})


module.exports = router