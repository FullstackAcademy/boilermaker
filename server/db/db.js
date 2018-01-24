const Sequelize = require('sequelize')
const connectionString = require('../../config')

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:${connectionString}`, {
    logging: false
  }
)
module.exports = db
