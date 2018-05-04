const Sequelize = require('sequelize')
const db = require('../db')

const Candidate = db.define('candidate', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  affiliation: {
    type: Sequelize.STRING
  },
  voteCount: {
    type: Sequelize.INTEGER
  }
});

module.exports = Candidate

