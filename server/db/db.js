const Sequelize = require('sequelize');
const pkg = require('../../package.json');
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://127.0.0.1:5432/bickr', {
    logging: false
  }
);
module.exports = db;
