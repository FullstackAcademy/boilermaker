import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'

const Review = (props) => {
	// let rev = props.review || { body: '', rating: 0, createdAt: '1984-1-1' }
		return (
			<div>
				<p>Rating: {props.review.rating} stars</p>
				<p>User: {props.review.user.email}</p>
				<p>Review: {props.review.body}</p>
			</div>
		)
}

export default Review
