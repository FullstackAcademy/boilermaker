const User = require('./User');
const Course = require('./Course');
const Lecture = require('./Lecture');

/**
 * Associations
 */
Course.belongsTo(User);
User.hasMany(Course);
Lecture.belongsTo(User, {through: Course});

module.exports = {
  User,
  Course,
  Lecture,
}
