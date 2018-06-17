const Sequelize = require('sequelize')
const db = require('../db')

const Player = db.define('court', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Player;
