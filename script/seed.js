'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {red, green} = require('chalk')

async function seed() {
  await db.sync({force: true})
  console.log('Database is synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  console.log(`Seeded ${users.length} Users`)
  console.log(green('Seeded database successfully'))
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('Seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(red('Oh no! Something went wrong!'))
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('Closing database connection...')
    await db.close()
    console.log('Database connection is closed!')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
