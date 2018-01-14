import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchOrders } from '../../store'

class OrderHistoryContainer extends React.Component {

	componentWillMount() {
		let userId = this.props.match.params.userId
		this.props.fetchOrders(userId)
	}

	render() {
		let list = this.props.orders.map(order => <li><Link to={`/orders/${order.id}`} key={order.id}>{order.id}</Link></li>)
		return (
			<div className="shoppingCartContainer marginTop">
				<h2>OrderContainer</h2>
				<ul>
					{
						list
					}
				</ul>
			</div>
		)
	}
}

const mapState = (state) => {
	return {
		orders: state.orders
	}
}

const mapDispatch = (dispatch) => {
	return {
		fetchOrders: (userId) => dispatch(fetchOrders(userId))
	}
}

export default connect(mapState, mapDispatch)(OrderHistoryContainer)
