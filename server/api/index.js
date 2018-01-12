const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/products', require('./products'));
router.use('/reviews', require('./reviews'));
router.use('/orders', require('./orders'));
router.use('/category', require('./category'))
router.use('/lineItems', require('./lineItem'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
