const router = require('express').Router();
const { Category } = require('../db/models');
const gatekeeperMiddleware = require('../../utils/gatekeeper');

router.get('/', (req, res, next) => {
  Category.findAll()
    .then(channels => res.json(channels))
    .catch(next);
})

router.post('/',
  gatekeeperMiddleware.isAdmin,
  (req, res, next) => {
    Channel.findOrCreate({
      where: req.body
    })
      .spread(channel => res.json(channel))
      .catch(next);
  })

module.exports = router;