const router = require('express').Router()
const { LineItem } = require('../db/models');

module.exports = router

router.get('/', (req, res, next) => {
    res.send(200);
})

router.post('/', (req, res, next) => {
    
})

router.put('/:id', (req, res, next) => {
    const lineItemId = req.params.id;


})