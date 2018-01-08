const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  name: {
    type: Sequelize.ENUM,
    unique: true,
    allowNull: false
  },

})

module.exports = Category
