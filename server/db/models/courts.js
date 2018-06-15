const Sequelize = require('sequelize')
const db = require('../db')

const Court = db.define('court', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Court;
