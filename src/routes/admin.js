const express = require('express')
const router = express.Router()
const AdminService = require('../services/admin')
const { Coin } = require('../models')
const config = require('../config')

const adminService = new AdminService(Coin)


router.get('/search', async (req, res) => {
    try {
        const coins = await adminService.getCoinsByName(req.query)
        res.json(coins)
    } catch (err) {
        res.status(400).send(err.message)
    }
})
router.post('/coin', async (req, res) => {
    try {
        await adminService.createCoin(req.body)
        res.status(201).json(req.body)
    } catch (err) {
        res.status(400).send(err.message)
    }
})
router.put('/coin/:id', async (req, res) => {
    try {
        await adminService.updateCoinInfo(req.params.id, req.body)
        res.status(200).json(req.body)
    } catch (err) {
        res.status(400).send(err.message)
    }

})

router.delete('/coin/:id', async (req, res) => {
    try {
        await adminService.deleteCoin(req.params.id)
        res.status(200).json({ result: "Successfully deleted" })
    } catch (err) {

    }
})

module.exports = router