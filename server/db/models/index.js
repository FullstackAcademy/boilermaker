const User = require('./user');
const Channel = require('./channel');
const Category = require('./category');
const UserChannel = require('./userChannel');

// User.belongsToMany(Channel, {through: 'Participants'});
// Channel.belongsToMany(User, {through: 'Participants'});

Channel.belongsTo(Category);
Channel.belongsTo(User);
User.hasMany(Channel);

// User.belongsToMany(Channel, {through: UserChannel, as: 'Broadcasters'});
// Channel.belongsToMany(User, {through: UserChannel, as: 'Broadcasters'});

module.exports = {
  User,
  Channel,
  Category,
  UserChannel
}
