import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import Review from './Review'

export default class ReviewForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			rating: 0,
			body: ''
		}
	}

	onReviewSubmit() {
		//thunk
		const review = {
			rating: this.state.rating,
			body: this.state.body,
			productId: this.props.productId
		}

	}

	render() {
		return (
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
					<textarea placeholder="your review" />
					<button type="submit">Submit</button>
				</form>
			</div>
		)
	}
}
