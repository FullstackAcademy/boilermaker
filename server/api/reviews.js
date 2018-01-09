const router = require('express').Router()
const { Review } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Review.findAll({
  })
    .then(reviews => res.json(reviews))
    .catch(next)
  }
)
