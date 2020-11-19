const router = require('express').Router()
const {Vendor} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const vendors = await Vendor.findAll({
      attributes: [
        'id',
        'email',
        'userName',
        'vendorAveragePrice',
        'vendorRating',
        'profilePic'
      ]
    })
    res.json(vendors)
  } catch (err) {
    next(err)
  }
})
