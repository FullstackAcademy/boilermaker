const User = require('./user');
const Channel = require('./channel');
const UserChannel = require('./userChannel');

User.belongsToMany(Channel, {through: 'Participants'});
Channel.belongsToMany(User, {through: 'Participants'});

User.belongsToMany(Channel, {through: UserChannel, as: 'Broadcasters'});
Channel.belongsToMany(User, {through: UserChannel, as: 'Broadcasters'});

module.exports = {
  User,
  Channel,
  UserChannel
}
