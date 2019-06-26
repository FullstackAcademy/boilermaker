const router = require('express').Router()
const {User} = require('../db/models')
var request = require('request')
var cheerio = require('cheerio')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/article', async (req, res, next) => {
  await request(
    'https://onezero.medium.com/we-already-know-what-our-data-is-worth-48bca5643844',
    function(error, response, html) {
      if (!error && response.statusCode == 200) {
        console.log('we got there!')
        res.json(html)
      }
    }
  )
})
