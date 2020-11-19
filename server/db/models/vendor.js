const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Vendor = db.define('vendor', {
  userName: {
    type: Sequelize.STRING
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  password: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('password')
    }
  },
  address: {
    type: Sequelize.STRING
  },
  bankInfo: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  },
  isVendor: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  vendorRating: {
    type: Sequelize.DECIMAL(10, 2),
    validate: {
      notEmpty: true,
      min: 3.0
    }
  },
  vendorAveragePrice: {
    type: Sequelize.STRING
  },
  vendorType: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: {
        args: [
          [
            'Makeup',
            'Hair Stylist',
            'Aesthetician',
            'Loctician',
            'Hair Braiding'
          ]
        ]
      }
    }
  },
  profilePic: {
    type: Sequelize.STRING
  }
})

module.exports = Vendor

Vendor.prototype.correctPassword = function(candidatePwd) {
  return Vendor.encryptPassword(candidatePwd, this.salt()) === this.password()
}

Vendor.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

Vendor.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

const setSaltAndPassword = vendor => {
  if (vendor.changed('password')) {
    vendor.salt = Vendor.generateSalt()
    vendor.password = Vendor.encryptPassword(vendor.password(), vendor.salt())
  }
}

Vendor.beforeCreate(setSaltAndPassword)
Vendor.beforeUpdate(setSaltAndPassword)
Vendor.beforeBulkCreate(vendors => {
  vendors.forEach(setSaltAndPassword)
})
