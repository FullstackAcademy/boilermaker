import React from 'react'
import axios from 'axios'

import OrderDetails from './OrderDetails'

export default class OrderContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			orders: []
		}
	}

	componentWillMount() {
		console.log('test')
		axios.get('/api/orders/1')
		.then(res => res.data)
		.then(results => {
			console.log(results)
			this.setState({ orders: results })
		})

	}

	render() {
		let list = this.state.orders.map(order => <OrderDetails key={order.id} order={order} />)
		return (
			<div>
				<p>OrderContainer</p>
				<ul>
					{
						list
					}
				</ul>
			</div>
		)
	}
}
