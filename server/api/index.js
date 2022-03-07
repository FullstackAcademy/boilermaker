const router = require('express').Router()

router.use('/users', require('./users'))
router.use('/pizzas', require('./pizzas'))
router.use('/orderItems', require('./orderItems'))
router.use('/orders', require('./orders'));

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router
