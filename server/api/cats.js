const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', (req, res) => {
  const cats = [
    {
      id: 1,
      name: 'Fluffy',
      breed: 'tabby',
    },
    {
      id: 2,
      name: 'Carmichael',
      breed: 'siamese',
    },
  ]
  res.json(cats)
})
