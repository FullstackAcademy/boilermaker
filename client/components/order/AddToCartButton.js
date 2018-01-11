import React from 'react'
import { connect } from 'react-redux'
import { addItem } from '../../store/cart'

const AddToCartButton = (props) => {
  return (
    <button onClick={() => props.addToCart(props.item)}>Add To Cart</button>
  )
}

const mapDispatch = (dispatch) => {
	return {
		addToCart: (item) => dispatch(addItem(item))
	}
}

export default connect(null, mapDispatch)(AddToCartButton)
