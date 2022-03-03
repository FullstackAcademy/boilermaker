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
    type: Sequelize.FLOAT,
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
  }
})

module.exports = Pizza
