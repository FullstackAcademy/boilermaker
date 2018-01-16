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
    User.create({email: 'murphy@email.com', password: '123', isAdmin: true})
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  // console.log(`seeded ${users.length} users`)
  // console.log(`seeded successfully`)

  // const categories = await Promise.all([
  //   Category.create({name: 'SHIO', id: 1}),
  //   Category.create({name: 'SHOYU', id: 2}),
  //   Category.create({name: 'MISO', id: 3}),
  //   Category.create({name: 'TONKOTSU', id: 4}),
  // ])
	const categories = await Category.create({name: 'SHIO'})
	.then(() => Category.create({name: 'SHOYU'}))
	.then(() => Category.create({name: 'MISO'}))
	.then(() => Category.create({name: 'TONKOTSU'}))

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  // console.log(`seeded ${categories.length} users`)
  // console.log(`seeded successfully`)

  const products = await Promise.all([
    Product.create({name: "SPICY PAITAN",
    image:"http://whereto.vn/custom/domain_1/articles/fullsize/article14741/a-combination-of-sesame-and-ramen-photo-alapaap88-wordpress-tin8-2.jpg",
    price: 899, description: "Tasty and made with classic wheat", inventoryCount: 50,
    size: 1, categoryId: 2}),

    Product.create({name: "CHICKEN PAITAN",
    image: "https://fthmb.tqn.com/6SpbqS3OAwdCSqk9gteOP7aq9ak=/960x0/filters:no_upscale()/GettyImages-1355176861-56de62135f9b5854a9f644aa.jpg",
    price: 1099, description: "Tasty and made with eggs", inventoryCount: 100,
    size: 1, categoryId: 4}),

    Product.create({name: "VEGETABLE PAITAN",
    image: "https://media-cdn.tripadvisor.com/media/photo-s/0e/1e/ff/d2/tonkotsu-ramen-hakata.jpg",
    price: 1099, description: "Tasty and made with eggs", inventoryCount: 100,
    size: 2, categoryId: 4}),

    Product.create({name: "MISO PAITAN",
    image: "http://www.yireservation.com/wp-content/uploads/2011/08/img_9348.jpg?x48477",
    price: 1199, description: "Tasty and made with rice", inventoryCount: 150,
    size: 1, categoryId: 1}),

    Product.create({name: "MEGA PAITAN",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1c7nMXKaBJUJsap2gi44gOIf_HftiALTviPqYGa-x22onwQCRww",
    price: 1399, description: "Tasty and made with sweet potatoes, zucchini and butternut squash", inventoryCount: 200,
    size: 2, categoryId: 3})
  ,

  Product.create({name: "TAIWAN PAITAN",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJP92ERTxXWYAeolqMQZHPhvBz98jjbz2qb9SEifB0plxonoZI1Q",
  price: 1499, description: "Tasty and made with sweet potatoes, zucchini and butternut squash", inventoryCount: 200,
  size: 2, categoryId: 3})
]

)

  const reviews = await Promise.all([
    Review.create({body: "A bit pricey for just a 5 pack but I wanted to try this. Its very flavorful, it's not a soupy ramen, but about as wet as yakisoba. I really enjoyed the level of spice. Not too spicy for me but plenty good. The thick oodles are great and the sauce base is so good and plentiful. I had my first bowl with veggies on the side and I added sesame seeds.I will buy it again, but want to get it cheaper. Definitely five stars from me, but then I love good instant ramen.", rating: 4.8, userId: 1, productId: 2}),

    Review.create({body: "When it comes to these Asian noodles, i'm an expert at this point. Years and years of consumption..I eat all types of varieties 4 days a week just about. So let me tell you about the Samyang Spicy Korean Noodles. These damn noodles are so delicious. Yes they're hot, but tasty hot, addicting i'd say. It reminds me of those Flamin Hot Cheetos flavor. The sauce is like a thick chili oil that has some sweetness to it. Slight sweetness with an umami chicken thing going on, it works well to balance that burn. The noodles themselves are thicker then your normal ramen noodles, they have great chew and are of very good quality. I prepare my noodles with ground turkey and add a bunch of herbs to it for freshness. A side of veggies to counter the noodles and you're good to go. YES you will stop eating them for a minute because your lips will burn and some sweat will develop on your forehead :) What I do is make sure the noodles are wrapped around my chopsticks or fork well before going into the mouth, that way you avoid touching your lips. That's where it's at trust me. Your mouth won't burn as much as your lips will, so just do the technique i described you should be fine. THE PAIN IS WORTH THE LOVE GO FOR IT!!!!", rating: 4, userId: 2, productId: 1}),

    Review.create({body: "On another occasion, hubby and I gave Ikkoryu Fukuoka Ramen another try. I knew their broth was salty so I asked for added hot water so I could dilute the broth, but the waitstaff serving us gave us cold drinking water. Again I asked for hot water, again same girl gave us more soup,, no I said I need hot water, but she gave me tap water instead, ok I give up, i will let that slide... (management pls tell your waitstaff to LISTEN to their customers.", rating: 5, userId: 2, productId: 3}),

    Review.create({body: "Ramenzon's veggie noodles are delicious and healthy. Thanks to Ramenzon, I can trick my kids into eating vegatables!", rating: 3, userId: 1, productId: 4})
  ,

  Review.create({body: "This totally made me appreciate ramen in another level! I love love love their ramen especially their original one... I forgot what is called. Their gyoza was pretty good too! And also their sea urchin chips (I really loved this one!) It goes really well with the ramen. The staff were also 11/10 nice and accommodating.", rating: 3, userId: 1, productId: 5}),

  Review.create({body: "If you need to find a legit ramen taste that is affordable on your budget, you got to try on this one. They serve ramen noodles good for two persons. Gyoza is also a must on your list.", rating: 4, userId: 1, productId: 6})
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
