const router = require('express').Router();
const { Channel } = require('../db/models');

router.get('/', (req, res, next) => {
    Channel.findAll()
        .then(channels => res.json(channels))
        .catch(next);
})

router.post('/', (req, res, next) => {
    Channel.findOrCreate({
        where: req.body
    })
        .spread(channel => res.json(channel))
        .catch(next);
})

module.exports = router;