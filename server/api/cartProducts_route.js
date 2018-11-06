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

router.get('/session', (req, res, next) => {
  try {
    const cartIdObj = {cartId: req.session.cartId}
    res.send(cartIdObj)
  } catch (err) {
    next(err)
  }
})

router.post('/session', (req, res, next) => {
  try {
    req.session.cartId = req.body.cartId
    res.send(req.session)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newCartProduct = await CartProduct.create({
      productId: req.body.productId,
      cartId: req.body.cartId,
      quantity: req.body.quantity
    })
    res.status(201).send(newCartProduct)
  } catch (err) {
    next(err)
  }
})

router.get('/:cartId', async (req, res, next) => {
  try {
    const productsInCart = await CartProduct.findAll({
      where: {cartId: req.params.cartId}
    })
    res.status(200).send(productsInCart)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newCartProduct = await CartProduct.create({
      productId: req.body.productId,
      cartId: req.body.cartId,
      quantity: req.body.quantity
    })
    res.status(201).send(newCartProduct)
  } catch (err) {
    next(err)
  }
})

router.put('/:cartId/:productId', async (req, res, next) => {
  try {
    const toBeModified = await CartProduct.findOne({
      where: {
        cartId: req.params.cartId,
        productId: req.params.productId
      }
    })

    const updated = await toBeModified.update({
      productId: toBeModified.productId,
      cartId: toBeModified.cartId,
      quantity: req.body.quantity
    })
    res.send(updated)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const cartId = req.session.cartId
    CartProduct.destroy({where: {productId: req.params.id, cartId: cartId}})
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})
