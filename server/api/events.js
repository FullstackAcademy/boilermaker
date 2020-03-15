const router = require('express').Router()
const {Activity} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    let minLat = +req.query.minLat
    let maxLat = +req.query.maxLat
    let minLng = +req.query.minLng
    let maxLng = +req.query.maxLng

    const events = await Activity.bbQuery(minLat, maxLat, minLng, maxLng)

    res.json(events)
  } catch (err) {
    next(err)
  }
})
