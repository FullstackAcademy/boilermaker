const router = require('express').Router()
const User = require('../db/models/user_model')
const Cart = require('../db/models/cart_model')
const CartProducts = require('../db/models/cartProducts_model')
module.exports = router

/* HELPER FUNCTIONS*/
async function cartCheckOnLogin(req, res, next, user) {
  //look for all the cart

  console.log('!!!!! this is the user.id', user.id)
  const doesCartExist = await Cart.findOne({where: {
    userId: user.id,
    purchased: false
  }})
  console.log('whats in here?', doesCartExist)
  let cartToSession
  if (!doesCartExist) {
    //THE CART DOESN'T EXIST SO MAKE A NEW CART

    cartToSession = await Cart.create({userId: user.id})
  } else {
    //THE CART EXIST SO SET SESSION WITH EXISTING CART

    cartToSession = doesCartExist
  }
  //ADD EVERYTHING to session
  req.session.cartId = cartToSession.id
  console.log('THIS IS THE REQ.SESSION', req.session)
  req.login(user, err => (err ? next(err) : res.json({
    user,
    cartId: cartToSession.id
  })))
}

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      cartCheckOnLogin(req, res, next, user)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  console.log('came from get request', req.session)
  res.json(req.user)
})

router.use('/google', require('./google'))

//when i log in, i want to see their cartId

//automatically make a defaultCart in which will be given to the guest user
//and on checkout it will create a newCart
// problem with websockets
