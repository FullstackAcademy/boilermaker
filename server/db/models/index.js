const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./user')
const Vendor = require('./vendor')

const Bookings = db.define('bookings', {
  date: {
    type: Sequelize.STRING
  },
  time: {
    type: Sequelize.STRING
  }
})

User.belongsToMany(Vendor, {through: Bookings})
Vendor.belongsToMany(User, {through: Bookings})

module.exports = {
  User,
  Vendor
}
