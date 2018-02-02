const Sequelize = require('sequelize');
const db = require('../db');

const Channel = db.define('channel', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      len: [3, 50],
      notEmpty: true
    }
  },
  type: {
    type: Sequelize.ENUM('Debate', 'Discussion', 'Rap-Battle'),
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
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