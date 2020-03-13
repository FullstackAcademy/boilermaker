const router = require('express').Router()
module.exports = router

if (!process.env.MAPBOX_TOKEN) {
  console.log('Mapbox token not found')
} else {
  const mapboxToken = process.env.MAPBOX_TOKEN

  router.get('/', (req, res) => {
    res.json(mapboxToken)
  })
}
