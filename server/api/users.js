const router = require('express').Router();
const User = require('../db').model('user');
module.exports = router;

router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(next);
});
