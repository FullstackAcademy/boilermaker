const router = require('express').Router();
const { Channel } = require('../db/models');

router.get('/', (req, res, next) => {
    Channel.findAll()
        .then(channels => res.json(channels))
        .catch(next);
})

router.post('/', (req, res, next) => {
    console.log('HERE: ', req.body);
    Channel.findOrCreate({
        where: req.body
    })
        .then(channel => res.json(channel))
        .catch(next);
})

module.exports = router;