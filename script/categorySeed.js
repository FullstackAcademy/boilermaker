const db = require('../server/db')
const { Category } = require('../server/db/models')

const seedCategories = async function () {
  const categories = await Promise.all([
    Category.create({ name: 'Politics', imagePath: "/category-logos/politics-logo.png" }),
    Category.create({ name: 'Anime', imagePath: "/category-logos/anime-logo.jpg" }),
    Category.create({ name: 'Gaming', imagePath: "/category-logos/gaming-logo.png" }),
    Category.create({ name: 'TV-Film', imagePath: "/category-logos/tv_film-logo.png" }),
    Category.create({ name: 'Sports', imagePath: "/category-logos/sports-logo.png" }),
    Category.create({ name: 'Books', imagePath: "/category-logos/books-logo.png" }),
    Category.create({ name: 'Fantasy Sports', imagePath: "/category-logos/fantasy_sports-logo.png" }),
    Category.create({ name: 'Food', imagePath: "/category-logos/food-logo.png" })
  ]);
  await console.log(`seeded ${categories.length} categories`)
}

module.exports = seedCategories;
