
const router = require('express').Router()
const { LineItem, Product } = require('../db/models');

module.exports = router

//GET /api/lineItems/:id
router.get('/:userId', (req, res, next) => {
    const userId = req.params.userId;

    LineItem.findAll({
        where: {userId},
        include:[Product]
    })
    .then(lineItems => {
        res.json(lineItems)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
	let lineItem = req.body
	LineItem.create(lineItem)
	.then(data => {
		res.send(data.dataValues)
	})
	.catch(err => console.log(err))
})

router.delete('/:lineItemId', (req, res, next)=>{
  const id = +req.params.lineItemId;
  LineItem.destroy({
    where: {
      id
    }
  })
  .then(()=>{
    res.status('204').send()
  })
  .catch(next)
})

//PUT /api/lineItems/:id
router.put('/:lineItemId', (req, res, next) => {
    const id = +req.params.lineItemId;
    const quantity = req.body.quantity
    LineItem.update(quantity, {
      where: {
        id
      }
    })
    .spread((updatedRowCount, updatedLineItem)=> {
      res.json(updatedLineItem)
    })
    .catch(next)
})
