const router = require('express').Router()
const {Mood} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const moods = await Mood.findAll()
    res.json(moods)
  } catch (err) {
    next(err)
  }
})
