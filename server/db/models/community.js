const Sequelize = require('sequelize')
const db = require('../db')

const Community = db.define('community', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  timeZone: {
    type: Sequelize.ENUM('PST', 'MST', 'CST', 'EST')
  }
})

module.exports = Community
