const crypto = require('crypto')
const {INTEGER} = require('sequelize')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  userID: {
    type: INTEGER,
    primaryKey: true
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {notEmpty: true}
  },
  userEmail: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {notEmpty: true}
  },
  userPassword: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  userPhone: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {notEmpty: true}
  },
  userAddress: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {notEmpty: true}
  },
  userType: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {notEmpty: true}
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})
