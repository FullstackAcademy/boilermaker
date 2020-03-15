var Promise = require('bluebird')
const db = require('../server/db')
var {Place} = require('../server/db/models')

async function seedCity(city, data) {
  await db.sync({force: true})
  console.log('db synced!')

  const dataSeeded = await Promise.map(Object.keys(data), function(name) {
    return Promise.map(data[name], function(item) {
      return db.model(name).create(item, {
        include: [Place]
      })
    })
  })

  console.log(`seeded ${city} data ${dataSeeded.length}`)
  console.log(`seeded successfully`)
}

module.exports = seedCity
