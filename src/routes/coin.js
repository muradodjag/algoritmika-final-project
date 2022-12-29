const express = require('express')
const router = express.Router()
const CoinService = require('../services/coin')
const { Coin } = require('../models')

const coinService = new CoinService(Coin)

router.get('/category/:id', async (req, res) => {
    const { params: { id } } = req
    try {
        console.log(req.query)
        const coins = await coinService.getByCategory(id, req.query)
        res.send(coins)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.get('/:id', async (req, res) => {
    const { params: { id } } = req
    try {
        const coins = await coinService.getById(id)
        res.send(coins)
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router