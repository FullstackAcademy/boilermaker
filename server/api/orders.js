const router = require('express').Router();
const { Order, Product, LineItem } = require('../db/models');
module.exports = router;

// GET api/orders
router.get('/:userId', (req, res, next) => {
  Order.findAll({
		where: {
			userId: req.params.userId
		},
		include: [LineItem]
	})
    .then(Orders => res.json(Orders))
    .catch(next)
});

// GET api/Orders/:orderId
router.get('/:orderId/lineItems', (req, res, next) => {
    const id = req.params.orderId;
    Order.findById(id, {
			include: [LineItem]
		})
        .then(order => {
            res.json(order);
        })
        .catch(next);
});

// POST api/orders
router.post('/', (req, res, next) => {
    Order.create(req.body.order)
    .then(order => {
        order.addProduct(req.body.shoppingCart);
        res.json(order);
    })
    .catch(next)
});

// Needs to be refactored: POST api/orders
// router.post('/:id', (req, res, next) => {
//     const userId = req.params.id;
//     Order.create()
//     .then(order => {
//         order.addLineItem([LineItem])
//         order.setUser([User])
//         res.json(order);
//     })
//     .catch(next)
// });

// PUT api/orders/:orderId
router.put('/:orderId', (req, res, next) => {
    const id = req.params.orderId;

    Order.findById(id, {
        include: [{model: Product}]
    })
    .then(order => res.json(order))
    .catch(next)
});

// DELETE api/orders/:orderId
router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    Order.destroy({ where: { id }})
        .then(() => {
            res.status(204).end()
        })
        .catch(next)
});
