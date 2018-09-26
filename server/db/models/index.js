const User = require('./user')
const Bill = require('./bills')
const Budget = require('./budget')
const BudgetItems = require('./budgetItems')
const Category = require('./categories')
const Spending = require('./spending')

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

Spending.belongsTo(User)
User.hasMany(Spending)

Spending.belongsTo(Category)
Category.hasMany(Spending)

BudgetItems.belongsTo(Budget)
Budget.hasMany(BudgetItems)

Budget.belongsTo(User)
User.hasOne(Budget)

BudgetItems.belongsTo(Category)
Category.hasMany(BudgetItems)

module.exports = {
  User,
  Bill,
  Budget,
  BudgetItems,
  Category,
  Spending
}
