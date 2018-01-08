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
    defaultValue: "https://i.pinimg.com/736x/91/5d/43/915d4345e49c0cdafa82cdfcf7ed9967.jpg"
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
    type: Sequalize.FLOAT,
    allowNull: false
  }
})

module.exports = Product

