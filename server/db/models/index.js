const User = require('./User');
const Class = require('./Class');
const Lecture = require('./Lecture');

/**
 * Associations
 */
Class.belongsTo(User);
Lecture.belongsTo(User, {through: Class});

module.exports = {
  User,
  Class,
  Lecture,
}
