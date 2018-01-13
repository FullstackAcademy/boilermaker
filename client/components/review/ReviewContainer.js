import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import Review from './Review'
import ReviewForm from './ReviewForm'


const ReviewContainer = (props) => {
	console.log(props)
	let list = []
	let productId
	if(props.reviews) {
		list = props.reviews.map(review => {
			return <Review key={review.id} review={review} />
		})
		productId = props.reviews[0].productId
	}
		return (
			<div>
				<ul>
					{
						list
					}
				</ul>
				<ReviewForm productId={productId} />
			</div>
		)
}

export default ReviewContainer
