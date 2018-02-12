const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router;

// GET api/users
router.get('/', (req, res, next) => {
  User.findAll({})
    .then(users => res.json(users))
    .catch(next)
});

// GET api/users/:userId
router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
        .then(user => {
            res.json(user);
        })
        .catch(next);
});

// POST api/users
router.post('/', (req, res, next) => {
    User.create(req.body)
    .then(user => res.json(user))
    .catch(next);
});

// PUT api/users/:userId
router.put('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
        .then(user => {
          user.update(req.body);
          res.json(user);
        })
        .catch(next)
});

// DELETE api/users/:userId
router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.destroy({ where: { id }})
        .then(() => {
            res.status(204).end()
        })
        .catch(next)
});