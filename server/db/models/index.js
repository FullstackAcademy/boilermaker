const User = require('./user')
const Order = require('./order')
const Pizza = require('./pizza')
const OrderItem = require('./orderItem')
const db = require('../db')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
User.hasMany(Order)
Order.belongsTo(User)
OrderItem.belongsTo(Order)
Order.hasMany(OrderItem)

Pizza.belongsToMany(Order, {through: 'pizzaOrders'})
Order.belongsToMany(Pizza, {through: 'pizzaOrders'})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  db,
  User,
  Pizza,
  Order
}
