const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },

})

module.exports = Category
