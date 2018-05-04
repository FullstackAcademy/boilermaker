const Sequelize = require('sequelize')
const db = require('../db')

const Election = db.define('election', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  stateDate: {
    type: Sequelize.DATE
  },
  endDate: {
    type: Sequelize.DATE
  }
});

module.exports = Election
