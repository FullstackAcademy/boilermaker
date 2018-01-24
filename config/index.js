const pkg = require('../package.json')

const PORT = 5432
const TEST_PORT = 5435

const connectionString = `${PORT}/${pkg.name}-test`

module.exports = connectionString
