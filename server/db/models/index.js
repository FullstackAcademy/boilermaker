const User = require('./user')
const Category = require('./category')
const Product = require('./product')
const Review = require('./review')
const Order = require('./order')
const LineItem = require('./lineItem')

Product.belongsTo(Category);
Category.hasMany(Product);

Review.belongsTo(User);
User.hasMany(Review);

Review.belongsTo(Product);
Product.hasMany(Review);

Product.belongsToMany(LineItem, {through: 'ProductLineItem'});
LineItem.belongsToMany(Product, {through: 'ProductLineItem'});

User.hasMany(Order)
Order.belongsTo(User)

LineItem.belongsTo(Order)
Order.hasMany(LineItem)

LineItem.belongsTo(User)
User.hasMany(LineItem)

module.exports = {
  User,
  Category,
  Product,
  Review,
  Order,
  LineItem
};
