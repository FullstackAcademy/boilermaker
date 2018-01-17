const router = require('express').Router()
const { Order, Product, LineItem } = require('../db/models')
module.exports = router

// GET all orders for orderhistory
router.get('/:userId', (req, res, next) => {
  Order.findAll({
		where: {
			userId: req.params.userId
		},
		include: [
			{
				model: LineItem,
				include: [Product]
			}
		]
	})
    .then(Orders => res.json(Orders))
    .catch(next)
})

//get orders for unauth user by sessionId
router.get('/unAuthenticated/:sessionId', (req, res, next) => {
	Order.findAll({
		where: {
			sessionId: req.params.sessionId
		},
		include: [
			{
				model: LineItem,
				include: [Product]
			}
		]
	})
    .then(orders => res.json(orders))
    .catch(next)
})

//GET shopping cart (only order that is not complete)
router.get('/:userId/cart', (req, res, next) => {
	Order.findOne({
		where: {
			userId: req.params.userId,
			isFullfilled: false
		},
		include: [
			{
				model: LineItem,
				include: [Product]
			}
		]
	})
	.then(data => res.json(data))
	.catch(err => console.log(err))
})


// GET api/Orders/:orderId
router.get('/:orderId/lineItems', (req, res, next) => {
    const id = req.params.orderId
    Order.findById(id, {
			include: [
				{
					model: LineItem,
					include: [Product]
				}
			]
		})
        .then(order => {
            res.json(order)
        })
        .catch(next)
})

// POST api/orders
router.post('/', (req, res, next) => {
    Order.create(req.body)
    .then(order => {
        // order.addProduct(req.body.shoppingCart)
        res.json(order)
    })
    .catch(next)
})

// Needs to be refactored: POST api/orders
// router.post('/:id', (req, res, next) => {
//     const userId = req.params.id
//     Order.create()
//     .then(order => {
//         order.addLineItem([LineItem])
//         order.setUser([User])
//         res.json(order)
//     })
//     .catch(next)
// })

// PUT api/orders/:orderId
router.put('/', (req, res, next) => {
    const id = req.body.orderId

    Order.update({
			isFullfilled: true
		}, {
			where: {
				id: id
			}
		})
    .then(order => {
			return Order.findById(id)
		})
		.then(result => res.json(result))
    .catch(next)
})

// DELETE api/orders/:orderId
router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId
    Order.destroy({ where: { id }})
        .then(() => {
            res.status(204).end()
        })
        .catch(next)
})
