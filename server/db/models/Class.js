const Sequelize = require('sequelize')
const db = require('../db')

const Class = db.define('class', {
  name: {
    type: Sequelize.STRING,
  },
});

module.exports = Class;
