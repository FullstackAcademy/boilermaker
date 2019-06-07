const router = require('express').Router()
const {Companies} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const companies = await Companies.findAll({
      attributes: ['companyName', 'sharePrice']
    })
    res.json(companies)
  } catch (err) {
    next(err)
  }
})

router.put('/:companyId', async (req, res, next) => {
  try {
    const updatedCompany = await Companies.update(
      {
        companyName: req.body.name,
        sharePriceData: req.sharePriceData,
        sharePrice: req.sharePrice,
        comments: comments
      },
      {
        where: {
          companyId: req.params.companyId
        }
      }
    )
    return res.status(201).json({
      error: false,
      message: 'todo has been updated.'
    })
  } catch (error) {
    next(error)
  }
})
