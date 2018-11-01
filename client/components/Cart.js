import React, {Component} from 'react'
import {connect} from 'react-redux'

class Cart extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="cart">
        <h2>Cart</h2>
      </div>
    )
  }
}

export default Cart
