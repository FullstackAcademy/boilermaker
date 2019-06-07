const Sequelize = require('sequelize')
const db = require('../db')

const Companies = db.define('companies', {
  companyId: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false
  },
  companyName: {
    type: Sequelize.STRING,
    unique: true
  },
  sharePriceDate: {
    type: Sequelize.STRING
  },
  sharePrice: {
    type: Sequelize.DECIMAL
  },
  comments: {
    type: Sequelize.TEXT
  }
})

module.exports = Companies
