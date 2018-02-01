const Sequelize = require('sequelize');
const db = require('../db');

const UserChannel = db.define('userchannel', {
    score: Sequelize.INTEGER
})

module.exports = UserChannel;