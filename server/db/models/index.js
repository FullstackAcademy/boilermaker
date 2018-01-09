const User = require('./user')
const Category = require('./category')
const Product = require('./product')
const Review = require('./review')
const Order = require('./order')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Product.belongsTo(Category);
Category.hasMany(Product);

Review.belongsTo(User);
User.hasMany(Review);

Review.belongsTo(Product);
Product.hasMany(Review);

Product.belongsToMany(Order, { through: "ProductOrder" });
Order.belongsToMany(Product, { through: "ProductOrder" });

User.hasMany(Order)
Order.belongsTo(User)

module.exports = {
  User,
  Category,
  Product,
  Review,
  Order
};
