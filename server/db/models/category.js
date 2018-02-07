const Sequelize = require('sequelize');
const db = require('../db');

const Category = db.define('category', {
  name: {
    type: Sequelize.STRING,
    unique: true
  },
  imagePath: {
    type: Sequelize.STRING,
    unique: true
  }
})

module.exports = Category;