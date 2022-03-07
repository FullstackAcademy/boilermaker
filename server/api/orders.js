const router = require('express').Router();
const { User, Order, OrderItem } = require('../db/models')
module.exports = router;

//DEPRECATED. NOW WE GET THE CART ITEMS FROM /api/orderItems?userId={int}
// GET /api/orders?userId={int}

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


// helper function for grabbing previous orders

async function getCompletedOrders(userId) {
  try {
    const orders = await Order.findAll({
      where: {
        userId,
        status: 'Completed',
      },
    })
    return orders
  } catch (error ){
    console.error(error)
  }
}


router.get('/orderHistory', async function (req, res, next) {
  try {
    const user = await User.findByToken(req.headers.authorization)
    const orders = await getCompletedOrders(user.id)
    for (let i = 0; i < orders.length; i++){
      const orderItems = await Order.getOrderItems(orders[i].id)
      orders[i] = orderItems
    }
    res.send(orders)
  } catch (error) {
    next(error)
  }
})
