import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import Review from './Review'

const ReviewContainer = (props) => {
	let list = props.reviews.map(review => <Review review={review} />)

		return (
			<div>
				<p>ReviewContainer</p>
				<ul>
					{
						list
					}
				</ul>
			</div>
		)
}

export default ReviewContainer
