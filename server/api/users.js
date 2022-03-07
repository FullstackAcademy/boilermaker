const userRouter = require('express').Router()
const {User} = require('../db/models')


const {requireToken, isAdmin} = require('./gatekeeping')

userRouter.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email','isAdmin' ]
    })
    // console.log(users)
   res.json(users)
  } catch (err) {
    console.error(err)
  }
})


module.exports = userRouter