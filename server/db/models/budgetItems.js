const Sequelize = require('sequelize')
const db = require('../db')

const BudgetItems = db.define('budgetItems', {
	amount: {
		type: Sequelize.DECIMAL,
		allowNull: false
	},
	mtdSpending: {
		type: Sequelize.DECIMAL,
		allowNull: false
	}
})

module.exports = BudgetItems