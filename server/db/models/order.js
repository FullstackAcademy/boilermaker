const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Order
