const router = require('express').Router()
const { UnAuthUser } = require('../db/models')

// GET api/unAuthenticated/unauthId
router.get('/:unAuthId', (req, res, next) => {
  UnAuthUser.findOne({
    where: {
			sessionId: req.params.unAuthId
		}
  })
    .then(unauth => res.json(unauth))
    .catch(next)
})

router.post('/', (req, res, next) => {
	console.log(req.body.sessionId)
  UnAuthUser.create({
		sessionId: req.body.sessionId
	})
    .then(unauth => res.json(unauth))
    .catch(next)
})

module.exports = router
