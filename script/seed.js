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
const {User, Category, Product, Review } = require('../server/db/models');

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  // console.log(`seeded ${users.length} users`)
  // console.log(`seeded successfully`)

  const categories = await Promise.all([
    Category.create({name: 'rice', id: 1}),
    Category.create({name: 'wheat', id: 2}),
    Category.create({name: 'Veggie', id: 3}),
    Category.create({name: 'Egg', id: 4}),
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  // console.log(`seeded ${categories.length} users`)
  // console.log(`seeded successfully`)

  const products = await Promise.all([
    Product.create({name: "Wheat Noodles",
    price: 8.00, description: "Tasty and made with classic wheat", inventoryCount: 50,
    size: 50, categoryId: 2}),Product.create({name: "Egg Noodles",
    image: "https://thefoodistuk.files.wordpress.com/2015/01/p1060025.jpg",
    price: 10.00, description: "Tasty and made with eggs", inventoryCount: 100,
    size: 60, categoryId: 4}),
    Product.create({name: "Rice Noodles",
    image: "https://s3.amazonaws.com/ktowntogo/1r/LNPozDyoUD.jpg",
    price: 11.50, description: "Tasty and made with rice", inventoryCount: 150,
    size: 80, categoryId: 1}),
    Product.create({name: "Veggie Noodles",
    image: "https://fitfoodiefinds.com/wp-content/uploads/2014/05/veggies5.jpg",
    price: 12.50, description: "Tasty and made with sweet potatoes, zucchini and butternut squash", inventoryCount: 200,
    size: 65, categoryId: 3})
  ])

  const reviews = await Promise.all([
    Review.create({body: "These noodles are the best noodles that I've ever had in my life! I am going to recommend to everyone I meet!", rating: 5, userId: 1, productId: 2}),
    Review.create({body: "Ramenzon's egg noodles are great! Since I am not vegan, I eat them everyday!", rating: 5, userId: 2, productId: 1}),
    Review.create({body: "These noodles are incredible! Why eat rice when you can eat Ramenzon's rice noodles!?!", rating: 5, userId: 2, productId: 3}),
    Review.create({body: "Ramenzon's veggie noodles are delicious and healthy. Thanks to Ramenzon, I can trick my kids into eating vegatables!", rating: 5, userId: 1, productId: 4})
  ])
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
