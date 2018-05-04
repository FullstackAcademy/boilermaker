const User = require('./user');
const Community = require('./community');
const Election = require('./election');
const Candidate = require('./candidate');

User.belongsTo(Community);
Community.hasMany(User);

Election.belongsTo(Community);
Community.hasMany(Election);

Candidate.belongsTo(Election);
Election.hasMany(Candidate);

module.exports = {
  Community,
  User,
  Election,
  Candidate
}
