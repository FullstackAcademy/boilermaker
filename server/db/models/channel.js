const Sequelize = require('sequelize');
const db = require('../db');

const Channel = db.define('channel', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isAlphanumeric: true,
      len: [3, 25],
      notEmpty: true
    }
  },
  type: {
    type: Sequelize.ENUM('Debate', 'Discussion', 'Rap-Battle'),
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue: '/default-channel-logo.png'
  },
  password: {
    type: Sequelize.STRING
  }
})

module.exports = Channel;