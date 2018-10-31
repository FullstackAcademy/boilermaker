const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const product = await Product.findAll()
    res.json(product)
  } catch (err) {
    next(err)
  }
})
//test
//test
//test//
//test//
router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    if (newProduct) res.status(201).send(newProduct)
  } catch (err) {
    next(err)
  }
})
