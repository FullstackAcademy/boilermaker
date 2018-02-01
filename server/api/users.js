const router = require('express').Router();
const { User } = require('../db/models');
const gatekeeper = require('../../utils/gatekeeper');

module.exports = router

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

router.get('/:userId', (req, res, next) => {
  User.findById(Number(req.params.userId))
    .then(user => res.json(user))
    .catch(next);
})

router.put('/:userId',
  gatekeeper.isSelf,
  (req, res, next) => {
  User.findById(Number(req.params.userId))
    .then(user => {
      user.update(req.body)
    })
    .then(user => res.json(user))
    .catch(next)
})

router.delete('/:userId',
  gatekeeper.isAdminOrSelf,
  (req, res, next) => {
    User.findById(Number(req.params.userId))
      .then(user => user.destroy())
      .then(() => res.sendStatus(204))
      .catch(next)
})