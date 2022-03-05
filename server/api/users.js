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

//POST api/users/:id
router.post('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    const pendingOrders = await user.getOrders({where: {status: 'Pending'}});
    const cart = pendingOrders[0];
    const newPizza = req.body;
    const newOrderItem = await OrderItem.create({
      name: newPizza.name,
      description: newPizza.description,
      salePrice: newPizza.price,
      imageUrl: newPizza.imageUrl,
      quantity: newPizza.quantity});
    const newRow = await cart.addOrderItem(newOrderItem.id);
    res.send(newRow);
  } catch (error) {
    next(error);
  }
})
