const router = require('express').Router()
const {User, OrderItem} = require('../db/models')
module.exports = router

const {requireToken, isAdmin} = require('./gatekeeping')

//GET api/users
router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    console.error(err)
  }
})

//CHANGE: ADDING TO CART POSTS TO /api/orderItems AND SETS THE ORDER OF THE ITEM TO THE USER'S CART.
//POST api/users/:id
//Adds item to the cart associated with the user.
// router.post('/:id', async (req, res, next) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     const pendingOrders = await user.getOrders({where: {status: 'Pending'}});
//     const cart = pendingOrders[0];
//     const newPizza = req.body;
//     const cartItems = await cart.getOrderItems();
//     if (cartItems.map(item => item.name).includes(newPizza.name)) {
//       const newOrderItem = await OrderItem.findOne({where: {
//         name: newPizza.name,
//         orderId: cart.id
//       }});
//       const newQuantity = newOrderItem.quantity + newPizza.quantity;
//       await newOrderItem.update({ quantity: newQuantity});
//       res.send(newOrderItem);
//     } else {
//       const newOrderItem = await OrderItem.create({
//         name: newPizza.name,
//         description: newPizza.description,
//         price: newPizza.price,
//         imageUrl: newPizza.imageUrl,
//         quantity: newPizza.quantity});
//       const newRow = await cart.addOrderItem(newOrderItem.id);
//       if (!newRow) {
//         console.log('Failed to add item to the cart!');
//       }
//       res.send(newOrderItem);
//     }
//     // const newPendingOrders = await user.getOrders({where: {status: 'Pending'}});
//     // const newCart = newPendingOrders[0];
//     // const newCartItems = await newCart.getOrderItems();
//   } catch (error) {
//     next(error);
//   }
// })
