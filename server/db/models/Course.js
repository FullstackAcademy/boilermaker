const Sequelize = require('sequelize')
const db = require('../db')

const Course = db.define('course', {
  name: {
    type: Sequelize.STRING,
  },
});

module.exports = Course;
