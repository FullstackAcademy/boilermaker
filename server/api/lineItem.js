import { Link } from '../../../../../../../Library/Caches/typescript/2.6/node_modules/@types/react-router-dom';

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
// router.put('/:id', (req, res, next) => {
//     const lineItemId = req.params.id;

//     LineItem.findById(lineItemId)
// })
