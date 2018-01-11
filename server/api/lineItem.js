const router = require('express').Router()
const { LineItem, Product } = require('../db/models');

module.exports = router

//GET /api/lineItems
router.get('/', (req, res, next) => {
    res.send(200);
})

// // POST api/orders
// router.post('/', (req, res, next) => {
//   Order.create(req.body.order)
//   .then(order => {
//       order.addProduct(req.body.shoppingCart);
//       res.json(order);
//   })
//   .catch(next)
// });


//POST /api/lineItems
router.post('/', (req, res, next) => {
  console.log('req body is --------------------------', req.body)
    const { userId, productId, quantity, price } = req.body
    LineItem.findOrCreate({
        where: {
            userId, quantity, price
        }
    })
    .spread((lineItem, isCreated) => {
      return lineItem.addProduct(productId)
    })
    .then(data => res.json(data))
    .catch(next)
})

//PUT /api/lineItems/:id
// router.put('/:id', (req, res, next) => {
//     const lineItemId = req.params.id;

//     LineItem.findById(lineItemId)
// })
