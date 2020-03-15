const Sequelize = require('sequelize')
const db = require('../db')

const Activity = db.define('activity', {
  name: Sequelize.STRING,
  age_range: Sequelize.STRING
})

module.exports = Activity
