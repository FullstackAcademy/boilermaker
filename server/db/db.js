const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName =
  'studentregistration' + (process.env.NODE_ENV === 'test' ? '-test' : '')

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,

  {
    host: 'localhost',
    logging: false,
    dialect: 'postgres'
  }
)
module.exports = db

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close())
}
