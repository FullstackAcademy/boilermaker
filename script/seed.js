'use strict'

const { db, syncAndSeed } = require('../server/db')

async function seed() {
  console.log('seeding...')
  try {
    await syncAndSeed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

seed();
