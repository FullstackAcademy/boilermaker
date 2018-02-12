const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: ""
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  inventoryCount: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  size: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
})

module.exports = Product

