const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:userId', (req, res, next) => {
  User.findById(Number(req.params.userId))
    .then(user => res.json(user))
    .catch(next);
})

router.put('/:userId', (req, res, next) => {
  User.findById(Number(req.params.userId))
    .then(user => {
      user.update(req.body)
    })
    .then(user => res.json(user))
    .catch(next)
})
