const router = require('express').Router();
const User = require('../db').model('users');
module.exports = router;

router.get('/', (req, res, next) => {
  User.find()
    .then(users => res.json(users))
    .catch(next);
});
