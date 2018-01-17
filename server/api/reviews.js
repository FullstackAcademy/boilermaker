const router = require('express').Router()
const { Review } = require('../db/models')
module.exports = router

//GET api/reviews
router.get('/:productId', (req, res, next) => {
	const productId = +req.params.productId
	Review.findReviewsWithAverage(productId)
		.then((reviews) => {
				res.json(reviews)
		})
})

//GET api/reviews/avgrating
router.get('/:productId/avgrating', (req, res, next) => {
  const productId = +req.params.productId
  console.log('productId  is-----------------', productId )



	Review.findAverage(productId)
    .then(avgRating => {
      console.log('avgrating is-----------------', avgRating)
      res.json(avgRating)
    })
    .catch(next)
  }
)

// GET api/reviews/:reviewId
router.get('/:reviewId', (req, res, next) => {
  const id = req.params.reviewId
  Review.findById(id)
      .then(review => {
          res.json(review)
      })
      .catch(next)
})

// POST api/reviews
router.post('/', (req, res, next) => {
  Review.create(req.body)
  .then(review => res.json(review))
  .catch(next)
})

// PUT api/reviews/:reviewId
router.put('/:reviewId', (req, res, next) => {
  const id = req.params.reviewId
  console.log('REQ', req.body)
  Review.findById(id)
      .then(review => review.update(req.body))
      .then(review => res.json(review))
      .catch(next)
})

// DELETE api/reviews/:reviewId
router.delete('/:reviewId', (req, res, next) => {
  const id = req.params.reviewId
  Review.destroy({ where: { id }})
      .then(() => {
          res.status(204).end()
      })
      .catch(next)
})
