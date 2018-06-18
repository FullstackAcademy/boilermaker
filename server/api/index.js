const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/courts', require('./courts'))
router.use('/games', require('./games'))
router.use('/transactions', require('./transactions'))


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
