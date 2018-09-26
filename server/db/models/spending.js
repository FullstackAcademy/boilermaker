const Sequelize = require('sequelize')
const db = require('../db')

const Spending = db.define('spending', {
	amount: {
		type: Sequelize.DECIMAL,
		allowNull: false
	},
	name: {
		type: Sequelize.STRING
	},
	date: {
		type: Sequelize.DATE
	}
})

module.exports = Spending