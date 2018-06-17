const Sequelize = require('sequelize')
const db = require('../db')

const Game = db.define('game', {
  location: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.STRING,
    allowNull: false
  },
  time: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Game;
