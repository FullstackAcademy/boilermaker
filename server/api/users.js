const router = require('express').Router();
const { User, Channel } = require('../db/models');
const gatekeeper = require('../../utils/gatekeeper');

module.exports = router

router.get('/', (req, res, next) => {
  let searchTerm = req.query.search;
  if (searchTerm) {
    User.findAll({
      where: {
        userName: {
          $iLike: `%${searchTerm}%`
        }
      }
    })
      .then(filteredUsers => res.json(filteredUsers))
      .catch(next);
  } else {
    User.findAll()
      .then(users => res.json(users))
      .catch(next);
  }
})

router.get('/:userId/channels', (req, res, next) => {
  Channel.findAll({
    where: {
      userId: Number(req.params.userId)
    }
  })
    .then(channels => res.json(channels))
    .catch(next);
})

router.get('/:userId', (req, res, next) => {
  User.findById(Number(req.params.userId), {
    include: [{ model: Channel }]
  })
    .then(user => res.json(user))
    .catch(next);
})

router.put('/:userId',
  gatekeeper.isSelf,
  (req, res, next) => {
    User.findById(Number(req.params.userId), {
      include: [{ model: Channel }]
    })
      .then(user => user.update(req.body))
      .then(updatedUser => res.json(updatedUser))
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