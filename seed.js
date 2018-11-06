const {green, red} = require('chalk')
const {
  db,
  User,
  Product,
  Cart,
  CartProducts
} = require('./server/db/models/index')

const users = [
  {
    firstName: 'Bob',
    lastName: 'Builder',
    email: 'bob.builder@fullstack.com',
    password: 'AlwaysBeCoding'
  },
  {
    firstName: 'Bill',
    lastName: 'Nye',
    email: 'Bill.Nye@fullstack.com',
    password: 'BILLBILLBILL'
  },
  {
    firstName: 'Arthur',
    lastName: 'Read',
    email: 'arthur.read@fullstack.com',
    password: 'AndISayHey'
  },
  {
    firstName: 'Curios',
    lastName: 'George',
    email: 'curios.george@fullstack.com',
    password: 'GetDownFromThatTree'
  }
]

const products = [
  {
    name: 'Winter is Coming T-Shirt',
    price: 15,
    imageUrl:
      'http://gameofthronesmerch.com/media/13839/winter_is_coming_tshirt.jpg'
  },
  {
    name: 'Targaryen Mug',
    price: 18,
    imageUrl: 'http://gameofthronesmerch.com/media/13849/stein.jpg'
  },
  {
    name: 'Character Toy Set',
    price: 32,
    imageUrl: 'http://gameofthronesmerch.com/media/13844/funko_pop_vinyls.jpg'
  },
  {
    name: 'Dragon Egg Set',
    price: 40,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51%2BEEsSN-fL._SL160_.jpg'
  },
  {
    name: 'Stark Flashdrive',
    price: 8,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/41L1kz7AX1L._SL160_.jpg'
  }
]

const seed = async () => {
  await db.sync({
    force: true
  })

  // seed your database here!
  await Promise.all(
    products.map(product => {
      Product.create(product)
    })
  )
  await Promise.all(
    users.map(user => {
      User.create(user)
    })
  )

  console.log(green('Seeding success!'))
  // db.close();
}

seed().catch(err => {
  console.error(red('Oh noes! Something went wrong!'))
  console.error(err)
  // db.close();
})
