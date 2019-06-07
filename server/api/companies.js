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
    console.log('this is companyId', req.params.companyId)
    console.log('this is req.body', req.body)
    const updatedCompany = await Companies.update(
      {
        companyName: req.body.companyName,
        sharePriceDate: req.body.sharePriceDate,
        sharePrice: req.body.sharePrice,
        comments: req.body.comments
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
