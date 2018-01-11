import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchOrders } from '../../store'

class OrderHistoryContainer extends React.Component {

	componentWillMount() {
		this.props.fetchOrders()
	}

	render() {
		let list = this.props.orders.map(order => <Link to={`/api/orders/${order.id}`} key={order.id}>{order.id}</Link>)
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

const mapState = (state) => {
	return {
		orders: state.orders
	}
}

const mapDispatch = (dispatch) => {
	return {
		fetchOrders: () => dispatch(fetchOrders({ id: 1 }))
	}
}

export default connect(mapState, mapDispatch)(OrderHistoryContainer)
