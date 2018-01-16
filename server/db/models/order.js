const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  isFullfilled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
	},
	isCreated: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	isProcessing: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	isCancelled: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
  address: {
		type: Sequelize.STRING
	},
	phone: {
		type: Sequelize.STRING(15)
	},
	creditCard: {
		type: Sequelize.STRING(16)
	},
	sessionId: {
		type: Sequelize.STRING,
		defaultValue: null
	}
})

module.exports = Order;
