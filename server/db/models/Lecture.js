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
  player_head_pos:{
    type: Sequelize.INTEGER,
    defaultValue: 0,
  }
});

module.exports = Lecture;
