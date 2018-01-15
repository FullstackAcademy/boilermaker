const router = require('express').Router()
const { LineItem, Product } = require('../db/models');

module.exports = router

//GET /api/lineItems/:id
router.get('/:id', (req, res, next) => {
    const userId = req.params.id;

    LineItem.findAll({
        where: {userId},
        include:[Product]
    })
    .then(lineItems => {
        console.log("backend linItems api=====", lineItems); res.json(lineItems)
    })
    .catch(next)
})

//POST /api/lineItems
router.post('/', (req, res, next) => {
    const { userId, productId, quantity, price } = req.body
    LineItem.create({userId, quantity, price})
    .then((lineItem, isCreated) => {
      Product.findById(`${productId}`)
      .then(product => {
        return product.setLineItem(lineItem)
      })
      .then((data)=>{
        // console.log('lineItem.id is--------------', lineItem.id)
        // return LineItem.findById(`${lineItem.id}`)
        // .then((data) => {
          console.log('data is-----------', data)
          res.json(data)})
        .catch(next)
      })
      .catch(next)
    })
// })

//PUT /api/lineItems/:id
// router.put('/:id', (req, res, next) => {
//     const lineItemId = req.params.id;

//     LineItem.findById(lineItemId)
// })
