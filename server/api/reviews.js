const router = require('express').Router()
const { Review } = require('../db/models')
module.exports = router

//GET api/reviews
router.get('/', (req, res, next) => {
  Review.findAll({
  })
    .then(reviews => res.json(reviews))
    .catch(next)
  }
)

// GET api/reviews/:reviewId
router.get('/:reviewId', (req, res, next) => {
  const id = req.params.reviewId;
  Review.findById(id)
      .then(review => {
          res.json(review)
      })
      .catch(next);
})

// POST api/reviews
router.post('/', (req, res, next) => {
  Review.create(req.body)
  .then(review => res.json(review))
  .catch(next)
})

// PUT api/reviews/:reviewId
router.put('/:reviewId', (req, res, next) => {
  const id = req.params.reviewId;
  console.log('REQ', req.body)
  Review.findById(id)
      .then(review => review.update(req.body))
      .then(review => res.json(review))
      .catch(next)
})

// DELETE api/reviews/:reviewId
router.delete('/:reviewId', (req, res, next) => {
  const id = req.params.reviewId;
  Review.destroy({ where: { id }})
      .then(() => {
          res.status(204).end()
      })
      .catch(next)
})
