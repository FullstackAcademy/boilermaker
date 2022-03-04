const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: Sequelize.ENUM("New", "Complete", "Shipped", "Pending"),
  address: {
    type: Sequelize.STRING,
    allowNull: true
  },
  city: {
    type: Sequelize.STRING,
    allowNull: true
  },
  provinceOrState: {
    type: Sequelize.STRING,
    allowNull: true
  },
  postalZipCode: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
})

module.exports = Order
