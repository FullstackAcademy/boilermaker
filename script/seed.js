'use strict'

const db = require('../server/db')
const {User, Course, Lecture} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const courses = await Promise.all([
    Course.create({name: 'Fullstack Academy', userId: 1}),
    Course.create({name: 'Khan Academy', userId: 1}),
    Course.create({name: 'DJ Tutorials', userId: 2})
  ])

  const lectures = await Promise.all([
    Lecture.create({
      title: "Cracking the Coding Interview",
      youtube_url: "https://www.youtube.com/watch?v=Eg5-tdAwclo",
      note: "I need to learn algorithms",
      userId: 1,
      courseId: 1
    }),
    Lecture.create({
      title: "Javascript Key Concepts",
      youtube_url: "https://www.youtube.com/watch?v=mvA6YuJ6c_Y&t=238s",
      note: "Top 3 Concepts to Learn Before Day One: Functional Composition,Higher Order Functions, Prototypal Inheritance",
      userId: 1,
      courseId: 1
    }),
    Lecture.create({
      title: "Toggler Brain Teaser",
      youtube_url: "https://www.youtube.com/watch?v=l3OkPYhDi9w",
      note: "I can't solve this problem. Hmmmmmmmm",
      userId: 1,
      courseId: 2
    }),
    Lecture.create({
      title: "Using the Ableton tool to make mashup music",
      youtube_url: "https://www.youtube.com/watch?v=lTx3G6h2xyA",
      note: "Clipped: how to use the Ableton Live to do a mashup",
      userId: 2,
      courseId: 3
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${courses.length} courses`)
  console.log(`seeded ${lectures.length} lectures`)
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
