/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const OrderItem = db.model('orderItem')

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

      it('requires "quantity"', async () => {
        item.quantity = null
        let result, error

        try {
          result = await item.validate()
        } catch (err) {
          error = err
        }

        if (result) throw Error('validation should fail when quantity is null')
        expect(error).to.be.an.instanceOf(Error)
      })
    })
  })
})
