const db = require('../db')
const User = require('./user')
const Cart = require('./cart')
const Product = require('./product')
const CartProducts = require('./cartProducts')
/**
 * associations
 */

Cart.belongsToMany(Product, { through: CartProducts })
Product.belongsToMany(Cart, { through: CartProducts })

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  db,
  User,
  Product,
  Cart,
  CartProducts
}
