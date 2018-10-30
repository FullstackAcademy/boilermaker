const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {})

module.exports = Cart