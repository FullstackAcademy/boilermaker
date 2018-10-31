const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  comment: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [25]
    }
  }
})

module.exports = Review
