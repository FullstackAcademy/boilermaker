/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const {User, Cart, CartProduct, Product, Review} = require('./index')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          firstName: 'Cody',
          lastName: 'puppy',
          email: 'cody@puppybook.com',
          password: 'bones'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')

//
describe('cartProduct association table attributes should autofill when a product/cart instance is created', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  // const oneAssociation = CartProduct.findAll()
  // oneAssociation.cartId = oneCart.id
  // oneAssociation.productId = oneProduct.id
  // oneAssociation.quantity = 2

  // oneAssociation.save()

  it('includes cartId, productId, and quantity', async () => {
    const oneProduct = await Product.create({
      name: 'soap',
      price: 14
    })

    const oneCart = await Cart.create()
    const oneAssociation = await CartProduct.create({
      cartId: oneCart.id,
      productId: oneProduct.id,
      quantity: 2
    })
    // console.log('oneAssociation', oneAssociation)

    const sampleTable = await CartProduct.findAll()
    // console.log('sampletable123', sampleTable)
    // expect(sampleTable.id).to.equal(1)
    expect(sampleTable[0].cartId).to.exist
    expect(sampleTable[0].productId).to.exist
    expect(sampleTable[0].quantity).to.equal(2)
  })
})

// describe('reviews model', () => {
//   it('validates instances min length', async () => {
//     const invalidReview = await Review.create({comment: 'this is <25'})
//     const resultingReview = await Review.findAll()
//     console.log('check123', resultingReview)
//     expect(resultingReview.length).to.be(0)
//
//     const validReview = await Review.create({
//       comment:
//         'this should be over twenty five characters long, please work for me'
//     })
//     const resultingReview2 = await Review.findAll()
//     expect(resultingReview.length).to.be(1)
//   })
// })
