const Sequelize = require('sequelize')
const db = require('../db')

const Pizza = db.define('pizza', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0
    }
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://pbs.twimg.com/profile_banners/628621903/1478015350/600x200'
  },
  cityOfPizza: {
    type: Sequelize.STRING,
    allowNull: true
  }
})

module.exports = Pizza
