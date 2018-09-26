const Sequelize = require('sequelize')
const db = require('../db')

const Bill = db.define('bills', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	type: {
		type: Sequelize.STRING
	},
	dueDate: {
		type: Sequelize.DATE
	},
	recurring: {
		type: Sequelize.STRING,
		validate: {
			isIn: [['daily', 'monthly', 'yearly', '']] 
		}
	},
	paid: {
		type: Sequelize.BOOLEAN
	}
}
)

module.exports = Bill