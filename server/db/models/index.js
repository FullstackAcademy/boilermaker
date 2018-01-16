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

//https://github.com/sequelize/sequelize/issues/5077
//does not work due the the N:M unique contraints with selquelze

// Product.belongsToMany(LineItem, {through: 'ProductLineItem', unique: false});
// LineItem.belongsToMany(Product, {through: 'ProductLineItem', unique: false});

User.hasMany(Order)
Order.belongsTo(User)


//cant use belongstomany shorthand, b/c of include statements...

Order.hasMany(LineItem)
LineItem.belongsTo(Order)
Product.hasMany(LineItem)
LineItem.belongsTo(Product)

//this is for the include on products...
LineItem.belongsTo(Product)

// Order.hasMany(LineItem)
// LineItem.belongsTo(Order)
//
// Product.hasMany(LineItem)
// LineItem.belongsTo(Product)


module.exports = {
  User,
  Category,
  Product,
  Review,
  Order,
  LineItem,
};
