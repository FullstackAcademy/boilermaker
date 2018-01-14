import React, {Component} from 'react'
import { connect } from 'react-redux'
import { fetchActiveOrder } from '../../store/order'

class OrderHistoryDetails extends Component{
	constructor(props){
		super(props)
	}

	componentWillMount(){
		const userId = this.props.match.params.userId;
		this.props.getOrder(userId);
	}

	render(){
		const { order } = this.props;
		return (
			<div>
				<p>order details...</p>
			</div>
		)
	}
}

const mapState = (state) => {
	return {
		order: state.order
	}
}

const mapDispatch = dispatch => {
	return {
		getOrder: (orderId) => {
			dispatch(fetchActiveOrder(orderId))
		},
		getItems: orderId => {
			dispatch()
		}
	}
}

export default connect(mapState, null)(OrderHistoryDetails)

//TODO: add redux state: activeOrder & orders[]
