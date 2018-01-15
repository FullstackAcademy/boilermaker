const router = require('express').Router();
const { Product, LineItem, Review } = require('../db/models');
module.exports = router;

// GET api/products
router.get('/', (req, res, next) => {
  Product.findAll({include: [Review]})
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

// GET api/products/lineItems/:id
router.get('/lineItems/:id', (req, res, next)=> {
    const lineItemId = req.params.id;
    LineItem.findById(lineItemId)
    .then(lineItem => {
        return lineItem.getProducts()
    })
    .then(products => {
        res.json(products)
    })
    .catch(next)
})

// POST api/products
router.post('/', (req, res, next) => {
    Product.create(req.body)
    .then(product => res.json(product))
    .catch(next);
});

// PUT api/products/:productId
router.put('/:productId', (req, res, next) => {
    const id = req.params.productId;
    console.log('hit put', req.body)
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
