const Sequelize = require('sequelize')
const db = require('../db')

const Hotel = db.define('hotel', {
  name: Sequelize.STRING,
  num_stars: {
    type: Sequelize.FLOAT,
    validate: {min: 1, max: 5}
  },
  amenities: Sequelize.STRING
})

module.exports = Hotel
