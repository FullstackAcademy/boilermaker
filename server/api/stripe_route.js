const stripe = require('stripe')('sk_test_KyddqiZI9if0catFDDzCPiF7')
const router = require('express').Router()

router.get('/', (req, res, next) => {
  const charge = stripe.charges.create({
    amount: 999,
    currency: 'usd',
    source: 'tok_visa',
    receipt_email: 'jenny.rosen@example.com'
  })
})
