const router = require('express').Router();
const { User } = require('../db/models')
module.exports = router;

//DEPRECATED. NOW WE GET THE CART ITEMS FROM /api/orderItems?userId={int}
//GET /api/orders?userId={int}
// router.get('/', async (req, res, next) => {
//   try {
//     const userId = req.query.userId;
//     const user = await User.findByPk(userId);
//     const pendingOrders = await user.getOrders({ where: { status: 'Pending'}});
//     const cart = pendingOrders[0];
//     const cartItems = await cart.getOrderItems();
//     res.send(cartItems);
//   } catch (error) {
//     next(error);
//   }
// })
