const Sequelize = require('sequelize')
const db = require('../db')

const LineItem = db.define('lineItem', {
  price: {
      type: Sequelize.INTEGER,
  },
  quantity: {
      type: Sequelize.INTEGER,
  }
})

module.exports = LineItem
