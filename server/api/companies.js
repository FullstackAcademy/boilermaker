const router = require('express').Router()
const {Companies} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const companies = await Companies.findAll({
      attributes: [
        'companyName',
        'sharePrice',
        'sharePriceDate',
        'comments',
        'companyId'
      ]
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
        companyName: req.body.companyName,
        sharePriceDate: req.body.sharePriceDate,
        sharePrice: req.body.sharePrice,
        comments: req.body.comments
      },
      {
        where: {
          companyId: req.params.companyId
        },
        individualHooks: true
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

router.post('/', async (req, res, next) => {
  try {
    const newCompany = await Companies.create(req.body)
    res.json(newCompany)
  } catch (err) {
    next(err)
  }
})
