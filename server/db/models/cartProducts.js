const Sequelize = require('sequelize')
const db = require('../db')

const CartProduct = db.define('cartProduct', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = CartProduct