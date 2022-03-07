const Router = require('express').Router()
const Pizza = require('../db/models/pizza')
const Order = require('../db/models/order')

Router.get('/', async (req, res, next) => {
  try {
    const allPizzas = await Pizza.findAll()
    res.send(allPizzas)
  } catch (error) {
    next(error)
  }
})

Router.get('/:id', async (req, res, next) => {
  try {
    const pizza = await Pizza.findByPk(req.params.id)
    res.send(pizza)
  } catch (error) {
    next(error)
  }
})

module.exports = Router
