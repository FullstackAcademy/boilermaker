const router = require('express').Router();
const { Product } = require('../db/models');
module.exports = router;

// GET api/products
router.get('/', (req, res, next) => {
  Product.findAll({})
    .then(products => res.json(products))
    .catch(next)
});

// GET api/products/:productId
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .then(product => {
            res.json(product);
        })
        .catch(next);
});

// POST api/products
router.post('/', (req, res, next) => {
    Product.create(req.body)
    .then(product => res.json(product))
    .catch(next);
});

// PUT api/products/:productId
router.put('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .then(product => {
            product.update(req.body);
            res.json(product);
        })
        .catch(next)
});

// DELETE api/products/:productId
router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.destroy({ where: { id }})
        .then(() => {
            res.status(204).end()
        })
        .catch(next)
});