const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('categories', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	}
})

module.exports = Category