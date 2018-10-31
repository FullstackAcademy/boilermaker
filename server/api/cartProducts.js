const router = require('express').Router()
module.exports = router
const {CartProduct} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const cartProducts = await CartProduct.findAll()
    res.status(200).send(cartProducts)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newCartProduct = CartProduct.create({
      productId: req.body.productId,
      cartId: req.body.cartId,
      quantity: req.body.quantity
    })
    res.status(201).send(newCartProduct)
  } catch (err) {
    console.log('route went wrong')
    next(err)
  }
})
