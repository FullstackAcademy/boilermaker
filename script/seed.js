/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db');
const {User, Category, Product} = require('../server/db/models');

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const products = await Promise.all([
    Product.create({name: "Egg Noodles", 
    image: "https://thefoodistuk.files.wordpress.com/2015/01/p1060025.jpg",
    price: 10.00, description: "Tasty and made with eggs", inventoryCount: 100,
    size: 60}),
    Product.create({name: "Wheat Noodles",
    price: 8.00, description: "Tasty and made with classic wheat", inventoryCount: 50,
    size: 50}),
    Product.create({name: "Rice Noodles",
    image: "https://s3.amazonaws.com/ktowntogo/1r/LNPozDyoUD.jpg",
    price: 11.50, description: "Tasty and made with rice", inventoryCount: 150,
    size: 80}),
    Product.create({name: "Veggie Noodles",
    image: "https://fitfoodiefinds.com/wp-content/uploads/2014/05/veggies5.jpg",
    price: 12.50, description: "Tasty and made with sweet potatoes, zucchini and butternut squash", inventoryCount: 200,
    size: 65})
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  // console.log(`seeded ${users.length} users`)
  // console.log(`seeded successfully`)

  const categories = await Promise.all([
    Category.create({name: 'rice'}),
    Category.create({name: 'wheat'}),
    Category.create({name: 'Veggie'}),
    Category.create({name: 'Egg'}),
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  // console.log(`seeded ${categories.length} users`)
  // console.log(`seeded successfully`)
}




// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
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

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
