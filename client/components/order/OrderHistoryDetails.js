import React, {Component} from 'react'
import { connect } from 'react-redux'
import { fetchActiveOrder } from '../../store/order'

class OrderHistoryDetails extends Component{
	constructor(props){
		super(props)
	}

	componentWillMount(){
		const orderId = this.props.match.params.orderId;
		this.props.getSingleOrder(orderId);
	}

	render(){
		const { activeOrder } = this.props;
		console.log('activeOrder?? ', activeOrder);
		return (
			<div>
				<p>order details...</p>
			</div>
		)
	}
}

const mapState = (state) => {
	return {
		activeOrder: state.activeOrder
	}
}

const mapDispatch = dispatch => {
	return {
		getSingleOrder: (orderId) => {
			dispatch(fetchActiveOrder(orderId))
		}
	}
}

export default connect(mapState, mapDispatch)(OrderHistoryDetails)