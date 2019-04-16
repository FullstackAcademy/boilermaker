const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('orderItem', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1
    }
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      isDecimal: true
    }
  }
})

module.exports = OrderItem
