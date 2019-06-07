const Sequelize = require('sequelize')
const db = require('../db')

const Companies = db.define(
  'companies',
  {
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
      type: Sequelize.STRING
    }
  },
  {
    hooks: {
      beforeUpdate: (instance, options) => {
        if (
          instance.dataValues.sharePrice >=
          10 * instance._previousDataValues.sharePrice
        ) {
          throw new Error('share price is greater than 10 times previous value')
        }
      }
    }
  }
)

module.exports = Companies
