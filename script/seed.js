'use strict'

const db = require('../server/db')
const {User, Post} = require('../server/db/models')

const users = [
  {
    firstName: 'Pepper',
    lastName: 'Thief',
    email: 'pepper@email.com',
    password: '123',
    imageUrl:
      '/Pepper_files/65484711_342054940053253_3436018288716960712_n.jpg',
    bio: `My name is Pepper and I'm obsessed with creating paper installations. `
  },
  {
    firstName: 'Gingerface',
    lastName: 'Spiller',
    email: 'gingerface@email.com',
    password: '123',
    imageUrl:
      '/Gingerface_files/66616515_2048533155252518_9035402003363389255_n.jpg',
    bio: `I possess the very rare talent of spilling water. When i see the ornaments it creates i feel like God is doing it through me.`
  },
  {
    firstName: 'Irene',
    lastName: 'Korat',
    email: 'irene@email.com',
    password: '123',
    imageUrl: '/Roon_files/50174048_2287158451606839_4761074576624341_n.jpg'
  },
  {
    firstName: 'Auchentoshen',
    lastName: 'Bellyroller',
    email: 'Auchentoshen@email.com',
    password: '123',
    imageUrl: '/Osh_files/67301721_367802100815270_71611851719051529_n(1).jpg'
  }
]

const posts = [
  {
    title: 'Tale about the tail',
    category: 'literature',
    textBody: `I saw my tail again today./n I tried to catch it/n All in vain`,
    userId: 1
  },
  {
    title: 'The art of being pretty',
    category: 'image',
    postUrl: '/Roon_files/50174048_2287158451606839_4761074576624341_n.jpg',
    userId: 3
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  await Promise.all(
    users.map(user => {
      return User.create(user)
    })
  )
  await Promise.all(
    posts.map(post => {
      return Post.create(post)
    })
  )

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
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
