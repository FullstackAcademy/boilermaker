const Sequelize = require('sequelize')
const db = require('../db')
const Review = db.define('review', {
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      len: [20, 5000]
    }
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  }
})

// Review.findAverage = function(productId){
//   return this.findAll({
//     where: {
//       productId: productId
//     }
//   })
//   .then(selectedProductReviews => {
//
//     const totalRating = selectedProductReviews
//     .reduce((accumulator, currentElement) => {
//       return accumulator + currentElement.rating
//     }, 0)
//     return totalRating / selectedProductReviews.length
//   })
// }

Review.findReviewsWithAverage = function(productId){
  return this.findAll({
    where: {
      productId: productId
    },
		include: [require('./User')]
  })
  .then(selectedProductReviews => {

    const totalRating = selectedProductReviews
    .reduce((accumulator, currentElement) => {
      return accumulator + currentElement.rating
    }, 0)
    return {reviews: [...selectedProductReviews], avg: totalRating / selectedProductReviews.length}
  })
}

module.exports = Review
