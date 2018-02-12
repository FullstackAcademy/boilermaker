const dbName = require('../../package.json').name
const Sequelize = require('sequelize')
const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`, {
    logging: false
  }
)
module.exports = db
