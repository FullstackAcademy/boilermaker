
import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { createReview } from '../../store'
import Review from './Review'

class ReviewForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			rating: 1,
			body: '',
			isShowing: false
		}
	}

	onReviewSubmit() {
		//thunk
		const review = {
			rating: this.state.rating,
			body: this.state.body,
			productId: this.props.productId,
			userId: this.props.user.id
		}
		this.props.createReview(review)
	}

	render() {
		return this.state.isShowing ? (
			<div>
				<form onSubmit={() => this.onReviewSubmit()}>
					<select value={this.state.rating} onChange={(e) => this.setState({ rating: e.target.value })}>
						<option>
							1
						</option>
						<option>
							2
						</option>
						<option>
							3
						</option>
						<option>
							4
						</option>
						<option>
							5
						</option>
					</select>
					<textarea placeholder="your review" onChange={(e) => this.setState({ body: e.target.value})} />
					<button type="submit">Submit</button>
					<button onClick={() => this.setState({ body: '', rating: 1, isShowing: false })}>Cancel</button>
				</form>
			</div>
		) : (
			<button onClick={() => this.setState({ isShowing: true })}>Add a Review</button>
		)
	}
}
const mapState = (state) => {
	return {
		user: state.user
	}
}
const mapDispatch = (dispatch) => {
	return {
		createReview(review) {
			dispatch(createReview(review))
		}
	}
}
export default connect(mapState, mapDispatch)(ReviewForm)
