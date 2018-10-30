const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    
    beforeEach(() => {
      return Product.create({
        name: 'cheese',
        price: 1
      })
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)
      
      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('cheese')
      expect(res.body[0].price).to.be.equal(1)
    })
  })
})