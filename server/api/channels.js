const router = require('express').Router();
const { Channel } = require('../db/models');
const gatekeeperMiddleware = require('../../utils/gatekeeper');

router.get('/', (req, res, next) => {
  let searchTerm = req.query.search;
  if (searchTerm) {
    Channel.findAll({
      where: {
        name: {
          $iLike: `%${searchTerm}%`
        }
      }
    })
      .then(filteredChannels => res.json(filteredChannels))
      .catch(next);
  } else {
    Channel.findAll()
      .then(channels => res.json(channels))
      .catch(next);
  }
})

router.get('/:categoryId', (req, res, next) => {
  Channel.findAll({
    where: {
      categoryId: {
        $eq: req.params.categoryId
      }
    }
  })
    .then(channels => res.json(channels))
    .catch(next);
})

router.post('/',
  gatekeeperMiddleware.isLoggedIn,
  (req, res, next) => {
    Channel.findOrCreate({
      where: req.body
    })
      .spread(channel => res.json(channel))
      .catch(next);
  })

module.exports = router;