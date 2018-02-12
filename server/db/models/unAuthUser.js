const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const UnAuthUser = db.define('unAuthUser', {
    sessionId: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING(15)
    },
    creditCard: {
        type: Sequelize.STRING(16)
    }
})

module.exports = UnAuthUser
