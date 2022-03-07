const router = require('express').Router()
const {OrderItem, Order, User} = require('../db/models')
module.exports = router;

//GET /api/orderItems?orderId={int}
//Get all the order items associated with a given order.
router.get('/', async (req, res, next) => {
  try {
    if (req.query.orderId) {
      const order = await Order.findByPk(req.query.orderId);
      const items = await order.getOrderItems();
      res.send(items);
    }
  } catch (error) {
    next(error);
  }
})

//GET /api/orderItems/cart?userId={int}
//On login, retrieve the cart items associated with the user.
router.get('/cart', async (req, res, next) => {
  try {
    if (req.query.userId) {
      const userId = req.query.userId;
      const user = await User.findByPk(userId);
      const pendingOrders = await user.getOrders({ where: { status: 'Pending'}});
      const cart = pendingOrders[0];
      const cartItems = await cart.getOrderItems();
      res.send(cartItems);
    }
  } catch (error) {
    next(error);
  }
})

//POST /api/orderItems
//Creates a new order item when it is added to the cart. Assigns the orderItem to the pending order associated with the registered user.
router.post('/', async (req, res, next) => {
  try {
    //Create an orderItem based on the info provided from the pizza object. NOTE: Quantity refers to the quantity selected by the user, not the inventory quantity.
    const { user, newPizza } = req.body;
    const newOrderItem = await OrderItem.create({
      name: newPizza.name,
      description: newPizza.description,
      price: newPizza.price,
      imageUrl: newPizza.imageUrl,
      quantity: newPizza.quantity,
    });

    //If this OrderItem is created by a registered user, assign it to its pending order (cart).
    if (user) {
      const userModel = await User.findByPk(user.id);
      const pendingOrders = await userModel.getOrders({ where: { status: 'Pending'}});
      const cart = pendingOrders[0];
      await newOrderItem.setOrder(cart);
    }
    res.send(newOrderItem);
  } catch (error) {
    next(error);
  }
})

// DELETE /api/orderItems/:id
// Deletes an order item, primarily due to its removal from the cart.
router.delete('/:id', async (req, res, next) => {
  try {
    const item = await OrderItem.findByPk(req.params.id);
    const result = await item.destroy();
    res.send(result);
  } catch (error) {
    next(error);
  }
})

// PUT /api/orderItems/:id
// updates an order item, usually because the quantity is updated in the cart.
router.put('/:id', async (req, res, next) => {
  try {
    const item = await OrderItem.findByPk(req.params.id);
    const newPizza = req.body;
    const newOrderItem = await item.update({
      name: newPizza.name,
      description: newPizza.description,
      price: newPizza.price,
      imageUrl: newPizza.imageUrl,
      quantity: newPizza.quantity,
    });
    res.send(newOrderItem);
  } catch (error) {
    next(error);
  }
})
