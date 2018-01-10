import React from 'react'
import { connect } from 'react-redux'
import { addItem } from '../../store/cart'

function AddToCartButton (props) {
  return (
    <button>Add To Cart</button>
  )
}

const mapDispatch = (dispatch) => {
	return {
		AddToCart: () => dispatch(addItem(item))
	}
}

export default connect(null, mapDispatch)(AddToCartButton)
