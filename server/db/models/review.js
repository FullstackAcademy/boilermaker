const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      len: {
        args: [20, 5000],
      }
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

module.exports = Review
