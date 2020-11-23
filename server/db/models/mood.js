const Sequelize = require('sequelize')
const db = require('../db')

const Mood = db.define('mood', {
  name: {
    type: Sequelize.STRING
  }
})

module.exports = Mood
