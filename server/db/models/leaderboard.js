const Sequelize = require('sequelize')
const db = require('../db')

const Leaderboard = db.define('leaderboard', {
  userName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  score: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Leaderboard
