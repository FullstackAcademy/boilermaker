const Sequelize = require('sequelize')
const db = require('../db')

const Lecture = db.define('lecture', {
  title:{
    type: Sequelize.STRING,
  },
  youtube_url:{
    type: Sequelize.STRING,
  },
  note:{
    type: Sequelize.TEXT,
  },
});

module.exports = Lecture;
