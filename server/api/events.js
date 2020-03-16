const router = require('express').Router()
const {Activity, Place} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    let minLat = +req.query.minLat
    let maxLat = +req.query.maxLat
    let minLng = +req.query.minLng
    let maxLng = +req.query.maxLng

    let events
    if (minLat && maxLat && minLng && maxLng) {
      events = await Activity.bbQuery(minLat, maxLat, minLng, maxLng)
    } else {
      events = await Activity.findAll({include: [{model: Place}]})
    }

    res.json(events)
  } catch (err) {
    next(err)
  }
})
