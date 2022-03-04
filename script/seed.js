'use strict'

const db = require('../server/db/db')
// const {User} = require('../server/db/models')

// async function seed() {
//   await db.sync({force: true})
//   console.log('db synced!')

//   const users = await Promise.all([
//     User.create({email: 'cody@email.com', password: '123'}),
//     User.create({email: 'murphy@email.com', password: '123'})
//   ])

//   console.log(`seeded successfully`)
// }

const {green, red} = require('chalk')
const {Pizza, User, Order} = require('../server/db/models')

const fakePizzas = [
  {
    name: 'Margharita!',
    description:
      'Plum tomato sauce with a blend of Fresh Mozzarella, Peccorino Romano, Reggiano Parmigiano and basil.',
    price: 999.99,
    imageUrl:
      'https://pbs.twimg.com/media/Dwecl7tVsAUcmX4?format=jpg&name=medium'
  },
  {
    name: 'Artichoke',
    description:
      'Spinach cream sauce with artichoke hearts and a blend of cheeses.',
    price: 12.99,
    imageUrl:
      'https://pbs.twimg.com/media/EVQJm7sX0AAb6Y8?format=jpg&name=medium'
  },
  {
    name: 'Detriot Pepperoni',
    description:
      'Detroit square pizza with a caramelized cheddar cheese crust, zesty tomato sauce and thick cut pepperoni cups.',
    price: 17.99,
    imageUrl:
      'https://pbs.twimg.com/media/D3pJeD3WAAAgjaI?format=jpg&name=small'
  },

  {
    name: 'Scilian',
    description:
      'Plum tomato sauce with a blend of cheeses, fresh basil, and olive oil on a twice baked crust.',
    price: 17.99,
    imageUrl:
      'https://pbs.twimg.com/media/DuzMghQV4AAmzcI?format=jpg&name=medium'
  },
  {
    name: 'Grandmas Special',
    description:
      "San Marzano tomatoes, fresh mozzarella, fresh jalapenos, spicy soppressata salami, Mike's Hot Honey, Parmigiano Reggiano D.O.P, and extra virgin olive oil.",
    price: 17.99,
    imageUrl:
      'https://pbs.twimg.com/media/Ci0nmDLWkAAnCCN?format=jpg&name=900x900'
  },
  {
    name: 'Staten Island',
    description:
      'San Marzano Tomato Sauce, Mozzarella di Bufala, Mushroom, spicy soppressata salami, Fresh Basil, Extra Virgin Olive Oil',
    price: 17.99,
    imageUrl:
      '	https://pbs.twimg.com/media/E-e5UGXUUAsR3qm?format=jpg&name=large'
  },
  {
    name: 'Brooklyn',
    description:
      'Plum tomato sauce, fresh mozzarella, spicy soppressata salami, Parmigiano Reggiano D.O.P, and extra virgin olive oil.',
    price: 17.99,
    imageUrl:
      'https://pbs.twimg.com/media/CqAAjxDWYAACxyN?format=jpg&name=medium'
  },
  {
    name: 'Caprocciosa or Caproccisoa',
    description:
      'San Marzano Tomato Sauce, Mozzarella di Bufala, Mushroom, Gaeta Olive,Rovagnati Granbiscotto Ham, Artichoke Hearts, Fresh Basil, Extra Virgin Olive Oil',
    price: 17.99,
    imageUrl:
      'https://pbs.twimg.com/media/FMvAzoQXEAA0SIV?format=jpg&name=small'
  }
]

const fakeUsers = [
  {
    firstName: 'David',
    lastName: 'Dunham',
    password: '12345',
    email: 'daviddfh@gmail.com'
  },
  {
    firstName: 'Sam',
    lastName: 'Smith',
    password: 'password',
    email: 'daviddfh2@gmail.com'
  },
  {
    firstName: 'Joe',
    lastName: 'Blow',
    password: 'password',
    email: 'daviddfh3@gmail.com'
  },
  {
    firstName: 'The',
    lastName: 'Admin',
    password: 'password',
    email: 'admin@admin.com'
  }

]

const fakeOrders = [
  {address: '123 Deerborn Lane'},
  {address: '234 Glen Oaks Court'},
  {address: '6123 Deerpath Road'}
]

const seed = async () => {
  try {
    await db.sync({force: true})
    await Promise.all(fakePizzas.map(pizza => Pizza.create(pizza)))
    await Promise.all(fakeOrders.map(order => Order.create(order)))
    await Promise.all(fakeUsers.map(user => User.create(user)))
  } catch (err) {
    console.log(red(err))
  }
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.

// async function runSeed() {
//   console.log('seeding...')
//   try {
//     await seed()
//   } catch (err) {
//     console.error(err)
//     process.exitCode = 1
//   } finally {
//     console.log('closing db connection')
//     await db.close()
//     console.log('db connection closed')
//   }
// }

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.

// if (module === require.main) {
//   runSeed()
// }

if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'))
      db.close()
    })
    .catch(err => {
      console.error(red('Oh noes! Something went wrong!'))
      console.error(err)
      db.close()
    })
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
