const router = require('express').Router()
// const { models } = require('sequelize') 
module.exports = router
const {Cart, CartProduct} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const allCarts = await Cart.findAll()
    res.status(200).send(allCarts)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newCart = await Cart.create()
    res.status(201).send(newCart)
  } catch (err) {
    next(err)
  }
})


