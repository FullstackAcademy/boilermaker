const User = require('./user')
const Court = require('./courts')
const Game = require('./games')

Court.belongsToMany(User, {through: 'courtPlayers'})
User.belongsToMany(Court, {through: 'courtPlayers'})

Game.belongsTo(User)
User.hasMany(Game)

Game.belongsTo(Court)
Court.hasMany(Game)

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
module.exports = {
  User, Game, Court
}
