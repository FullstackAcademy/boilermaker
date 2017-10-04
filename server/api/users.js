const router = require('express').Router()
const {User} = require('../db/models')
const {isAdmin, isSelf} = require('../permissions')
module.exports = router

router.param('id', (req, res, next, id) => {
  User.findById(id, {attributes: ['id', 'email', 'isAdmin']})
    .then(user => {
      if (!user) {
        const err = new Error('Not found!')
        err.status = 401
        next(err)
      } else {
        req.requestedUser = user
        next()
      }
    })
    .catch(next)
})

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

/**
 * In this example app, a user should only be able to get or modify themselves (but not other users), and only
 * admins should be able to delete a user. Methods like `router.get` can accept any number of middleware
 * functions to 'pipe' the request through. We require our permissions middleware functions (isSelf and isAdmin),
 * and add these as additional arguments BEFORE the middleware function that sends the response. This way,
 * every request we send will be evaluated by that permissions middleware function.
 */
router.get('/:id', isSelf, (req, res, next) => {
  res.json(req.requestedUser)
})

router.put('/:id', isSelf, (req, res, next) => {
  req.requestedUser.update(req.body)
    .then(user => res.json(user))
    .catch(next)
})

router.delete('/:id', isAdmin, (req, res, next) => {
  req.requestedUser.destroy()
    .then(user => res.sendStatus(204))
    .catch(next)
})
