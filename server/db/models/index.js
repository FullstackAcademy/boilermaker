const db = require('../db')
const User = require('./user_model')
const Cart = require('./cart_model')
const Product = require('./product_model')
const CartProduct = require('./cartProducts_model')
const Review = require('./reviews_model')
/**
 * associations
 */

Cart.belongsToMany(Product, {
  through: CartProduct
})
Product.belongsToMany(Cart, {
  through: CartProduct
})

Review.belongsTo(Product)
Review.belongsTo(User)

User.hasMany(Cart)
Cart.belongsTo(User)

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
  CartProduct,
  Review
}
