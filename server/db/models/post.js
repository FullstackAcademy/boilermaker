const Sequelize = require('sequelize')
const db = require('../db')

const Post = db.define('post', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  postUrl: {
    type: Sequelize.STRING
  },
  tags: {
    type: Sequelize.STRING
  },
  likes: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  textBody: {
    type: Sequelize.TEXT
  }
})

module.exports = Post
