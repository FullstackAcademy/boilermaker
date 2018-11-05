import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartProductsThunk, getSessionCartIdThunk} from '../store/cart_store'
import axios from 'axios'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productTemps: []
    }
    this.getCartId = this.getCartId.bind(this)
    this.getProductInfo = this.getProductInfo.bind(this)
    this.populatesState = this.populatesState.bind(this)
  }

    componentDidMount() {
    const cartId = this.getCartId()
    this.props.populateCart(cartId)
    this.populatesState()
  }

  getCartId() {
    const cartId = this.props.getSessionCartId()
    console.log('current session cart id', cartId)
    return cartId
  }

  async getProductInfo(productId) {
    const productObj = await axios.get(`/api/products/${productId}`)
    const product = productObj.data
    return product
  }

  async populatesState() {
    const resultingProducts = this.props.products.map(async product => {
      const singleProduct = await this.getProductInfo(product.productId)
      console.log('singleProduct', singleProduct)
      this.setState({productTemps: [...this.state.productTemps, singleProduct]})
    })
    console.log('CurrentState:', this.state)
  }

  render() {
    console.log('current state at time of render', this.state)
    return (
      <div className="cart">
        <h2>Cart</h2>
        <table>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity:</th>
          </tr>
          {this.state.productTemps.map((product, idx) => {
            return (
              <tr>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{this.props.products[idx].quantity}</td>
              </tr>
            )
          })}
        </table>
        <div>Total:</div>
      </div>
    )
  }
}

const mapState = state => ({
  products: state.cart.products
})

const mapDispatch = dispatch => ({
  populateCart: cartId => dispatch(getCartProductsThunk(cartId)),
  getSessionCartId: () => dispatch(getSessionCartIdThunk())
})

const connectedCart = connect(
  mapState,
  mapDispatch
)(Cart)

export default connectedCart
