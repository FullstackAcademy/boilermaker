import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import Review from './Review'
import ReviewForm from './ReviewForm'


const ReviewContainer = (props) => {
	console.log(props)
	let list = []
	if(props.reviews) {
		list = props.reviews.map(review => {
			console.log('review', review)
			return <Review key={review.id} review={review} />
		})
	}
		return (
			<div>
				<ul>
					{
						list
					}
				</ul>
				<ReviewForm productId={list[0].productId} />
			</div>
		)
}

export default ReviewContainer
