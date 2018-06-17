const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email', 'courtId']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.put('/', async (req, res, next) => {
  console.log("hello")
  try {
      const court = await User.update({courtId: req.body.courtId}, { where: {id: req.body.id}, returning: true })
      res.json(court[0])
  } catch (err){
      next(err)
  }
})
