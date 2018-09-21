const User = require('./User');
const Class = require('./Class');
const Lecture = require('./Lecture');

/**
 * Associations
 */
Class.belongsTo(User);
User.hasMany(Lecture, {through: Class});

module.exports = {
  User,
  Class,
  Lecture,
}
