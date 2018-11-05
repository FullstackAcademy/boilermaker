const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', () => {
  //check for admit
  //if so, next, if not err
  //write in utils file
}, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'firstName', 'lastName']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//test
