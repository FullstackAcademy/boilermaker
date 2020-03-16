const router = require('express').Router()
const {Place} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    let minLat = +req.query.minLat
    let maxLat = +req.query.maxLat
    let minLng = +req.query.minLng
    let maxLng = +req.query.maxLng

    let places
    if (minLat && maxLat && minLng && maxLng) {
      places = await Place.bbQuery(minLat, maxLat, minLng, maxLng)
    } else {
      places = await Place.findAll()
    }

    res.json(places)
  } catch (err) {
    next(err)
  }
})
