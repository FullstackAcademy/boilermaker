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
    name: 'apple',
    price: 1,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCeE-XUkjXgBWaqNaMprbN58CCXIOo8UxSQickhEYJw2b3Bae2dA'
  },
  {
    name: 'avocado',
    price: 3,
    imageUrl:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/avocado-uses-cut-avocado-1521593581.jpg?crop=1.00xw:0.790xh;0,0.210xh&resize=1200:*'
    price: 1
  },
  {
    name: 'banana',
    price: 2
  },
  {
    name: 'strawberry',
    price: 5
  },
  {
    name: 'plum',
    price: 4
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
