/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const OrderItem = db.model('OrderItem')

describe('Order Item model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('validate columns', () => {
    describe('validateColumns', () => {
      let item

      beforeEach(async () => {
        item = await OrderItem.create({
          quantity: 3,
          price: 1.5
        })
      })

      it('returns true if the quantity is a number', () => {
        expect(item.quantity.to.be.a('number'))
      })

      it('returns true if the price is a number', () => {
        expect(item.price.to.be.a('number'))
      })
    })
  })
})
