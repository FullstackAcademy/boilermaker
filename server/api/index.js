const router = require('express').Router()
module.exports = router

router.use('/users', require('./users_route'))
router.use('/products', require('./products_route'))
router.use('/carts', require('./carts_route'))
router.use('/cartProducts', require('./cartProducts_route'))
// router.use('/stripe', require('./stripe_route'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
