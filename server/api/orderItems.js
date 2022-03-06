const router = require('express').Router()
const {OrderItem, Order} = require('../db/models')
module.exports = router;

router.post('/', async (req, res, next) => {
  try {
    const newPizza = req.body;
    const newOrderItem = await OrderItem.create({
      name: newPizza.name,
      description: newPizza.description,
      price: newPizza.price,
      imageUrl: newPizza.imageUrl,
      quantity: newPizza.quantity,
    });
    const guestCart = await Order.findOne({
      where: {
        status: "Pending",
        userId: null
      }
    });
    await newOrderItem.setOrder(guestCart);
    // const newCart = await guestCart.getOrderItems();
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
