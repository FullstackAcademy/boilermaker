const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Questions = db.define(
  'questions',
  {
    question: {
      type: Sequelize.TEXT
    }
  },
  {
    choices: {
      type: Sequelize.ARRAY
    }
  }
)
