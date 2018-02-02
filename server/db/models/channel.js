const Sequelize = require('sequelize');
const db = require('../db');

const Channel = db.define('channel', {
  name: {
    type: Sequelize.STRING,
    unique: true
  },
  type: {
    type: Sequelize.ENUM('Debate', 'Discussion', 'Rap-Battle')
  },
  description: {
    type: Sequelize.STRING,
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue: '/default-channel-logo.png'
  },
  password: {
    type: Sequelize.STRING
  },
  size: {
    type: Sequelize.INTEGER
  }
})

module.exports = Channel;