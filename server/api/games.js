const router = require('express').Router()
const {Game} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const feelings = await Game.findAll({include: [{all: true}]})
        res.json(feelings)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const game = await Game.findAll({where: {courtId: req.params.id}, include: [{all: true}]})
        console.log(game)
        res.json(game)
    } catch (error){
        next(error)
    }
})

router.get('/players/:id', async (req, res, next) => {
  try {
      const game = await Game.findAll({where: {id: req.params.id}, include: [{all: true}]})
      console.log(game)
      res.json(game)
  } catch (error){
      next(error)
  }
})


router.post('/', async (req, res, next) => {
    try {
        const game = await Game.create(req.body)
        res.json(game)
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
  try {
      const game = await Game.update(req.body, { where: {id: req.body.id} })
      res.json(game)
  } catch (err){
      next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
      await Game.destroy({where: {id: +req.params.id}})
      res.json(req.params.id)
  } catch (err){
      next(err)

  }
})
