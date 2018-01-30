const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  name: {
    type: Sequelize.STRING
  },
  userName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  photoURL: {
    type: Sequelize.STRING,
  },
  googleId: {
    type: Sequelize.STRING
  },
  facebookId: {
    type: Sequelize.STRING
  },
  admin: {
    type: Sequelize.BOOLEAN
  }
})

module.exports = User