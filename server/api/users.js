const router = require('express').Router()
const {User} = require('../db/models')
const {isAdmin, isSelf} = require('../permissions')
module.exports = router

router.param('id', (req, res, next, id) => {
  User.findById(id)
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
