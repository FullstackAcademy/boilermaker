const router = require('express').Router()
const {Transaction} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const transactions = await Transaction.findAll({include: [{all: true}]})
        res.json(transactions)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const transaction = await Transaction.findAll({where: {gameId: req.params.id}, include: [{all: true}]})
        console.log(transaction)
        res.json(transaction)
    } catch (error){
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const addNewGame = await Transaction.create(req.body)
        res.json(addNewGame)
    } catch (err) {
        next(err)
    }
})
