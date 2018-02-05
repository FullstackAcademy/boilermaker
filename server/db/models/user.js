const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
const Channel = require('./channel');

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: /^[a-zA-Z\s]*$/,
      notEmpty: true
    }
  },
  userName: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      len: [3, 15],
      isAlphanumeric: true,
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  photoURL: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    }
  },
  score: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      isInt: true,
      min: 0
    }
  },
  wins: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  losses: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  googleId: {
    type: Sequelize.STRING
  },
  facebookId: {
    type: Sequelize.STRING
  },
  admin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = User;
