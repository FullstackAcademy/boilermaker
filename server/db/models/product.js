const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER, //Sequelize.FLOAT
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCeE-XUkjXgBWaqNaMprbN58CCXIOo8UxSQickhEYJw2b3Bae2dA'
  },
  description: {
    type: Sequelize.STRING
  }
})

module.exports = Product
