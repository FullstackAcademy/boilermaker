const db = require('../server/db')
const { User, Channel } = require('../server/db/models')
const seedUsers = require('./userSeed.js');
const seedChannels = require('./channelSeed.js');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!')

  await seedUsers();
  await seedChannels();
  
  console.log(`seeded successfully`)
}

seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

console.log('seeding...')
