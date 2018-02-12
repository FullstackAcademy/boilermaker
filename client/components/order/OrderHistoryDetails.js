import React, {Component} from 'react'
import { connect } from 'react-redux'
import { fetchActiveOrder } from '../../store/singleOrder'

class OrderHistoryDetails extends Component{
	constructor(props){
		super(props)
	}

	componentWillMount(){
		const orderId = this.props.match.params.orderId
		this.props.getSingleOrder(orderId)
	}

	render(){
		const { activeOrder } = this.props
		return (
			<div>
			{
				activeOrder&&
				<div className="flex-container-column shoppingCartContainer marginTop">
					<h2>order details...</h2>
					<ul>
					{
						activeOrder.lineItems && activeOrder.lineItems.map(lineItem => {
							return (
								<div key={lineItem.id}>
									<li>LineItem #{lineItem.id}</li>
									<ol>
										<div key={lineItem.product.id}>
											<li>{lineItem.product.name} ${lineItem.product.price}</li>
										</div>
									</ol>
								</div>
							)
						})
					}
					</ul>
				</div>
			}
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
