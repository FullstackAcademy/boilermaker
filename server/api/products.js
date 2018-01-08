const router = require('express').Router();
const { Product } = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  Product.findAll({})
    .then(products => res.json(products))
    .catch(next)
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .then(product => {
            res.json(product);
        })
        .catch(next);
});

router.post('/', (req, res, next) => {
    const { name, image, price, description, inventoryCount, size } = req.body;
    Product.findOrCreate({where: {
        name,
        image,
        price,
        description,
        inventoryCount,
        size
    }})
    .then(([product, created]) => {
        res.json(product);
    })
    .catch(next);
});

router.put('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .then(product => product.update(req.body))
        .catch(next)
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.destroy({ where: { id }})
        .then(() => {
            res.status(204).end()
        })
        .catch(next)
});