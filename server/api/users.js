const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

const verifyAdminOrUser = async function(req, res, next) {
	try {
    
		req.userVerified = await User.findByPk(req.user.id)
		next()
	} catch (error) {
		next(error)
	}
}
router.use(verifyAdminOrUser)
router.get('/', async (req, res, next) => {
	try {
    const user = req.userVerified 
    console.log('user', user)
   
		if (!user || !user.admin) console.error('Insufficient Rights')
		else {
			const users = await User.findAll({
				attributes: [
					'id',
					'email',
					'address',
					'username',
					'firstName',
					'lastName'
				]
			})
			res.json(users)
		}
	} catch (error) {
		next(error)
	}
})

router.get('/:id', async (req, res, next) => {
	try {
		const user = req.userVerified 
		if (user.id === parseInt(req.params.id) || user.admin) {
			const users = await User.findAll({
				where: {
					id: req.params.id
				},
				attributes: [
					'id',
					'email',
					'username',
					'firstName',
					'lastName',
					'country',
					'admin'
				]
			})
			res.json(users)
		} else {
			res.status(401).send('Insufficient Rights')
		}
	} catch (error) {
		next(error)
	}
})


router.put('/:id', async (req, res, next) => {
	try {
		if (req.params.id !== '0') {
			const user = req.userVerified 
			if (user.id === parseInt(req.params.id) || user.admin) {
				await User.update(
					{
						email: req.body.email,
						password: req.body.password,
						username: req.body.username,
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						country: req.body.country
					},

					{
						where: { id: req.params.id },
						individualHooks: true
					}
				)

				if (user.admin && !(user.id === parseInt(req.params.id))) {
					await User.update(
						{
							email: req.body.email,
							password: req.body.password,
							username: req.body.username,
							firstName: req.body.firstName,
							lastName: req.body.lastName,
							country: req.body.country
						},

						{
							where: { id: req.params.id },
							individualHooks: true
						}
					)

					res.json(user)
				} else {
					res.status(401).send('Insufficient Rights')
				}
			} else {
				res.sendStatus(201)
			}
		}
	} catch (error) {
		res.status(401).send(error.message)
	}
})

router.delete('/:id', async (req, res, next) => {
	try {
		const user = req.userVerified 
		if (user.id === parseInt(req.params.id) || user.admin) {
			const destroyed = await User.destroy({
				where: { id: parseInt(req.params.id) }
			})
			res.json(destroyed)
		} else {
			res.status(401).send('Insufficient Rights')
		}
	} catch (error) {
		next(error)
	}
})