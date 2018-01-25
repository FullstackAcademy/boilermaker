const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');

const Channel = db.define('channels', {
    name: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING,
    },
    category: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING
    },
    size: { 
        type: Sequelize.INTEGER
    }
})

module.exports = Channel;