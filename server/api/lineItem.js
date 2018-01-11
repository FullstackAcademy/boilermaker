const router = require('express').Router()
const { LineItem } = require('../db/models');

module.exports = router

//GET /api/lineItems
router.get('/', (req, res, next) => {
    res.send(200);
})

//POST /api/lineItems
router.post('/', (req, res, next) => {
    const { userId, productId, quantity, price } = req.body

    LineItem.findOrCreate({
        where: {
            userId, productId, quantity, price
        }
    })
    .spread((lineItem, isCreated) => {
        res.json(lineItem)
    })
    .catch(next)
})

//PUT /api/lineItems/:id
// router.put('/:id', (req, res, next) => {
//     const lineItemId = req.params.id;

//     LineItem.findById(lineItemId)
// })