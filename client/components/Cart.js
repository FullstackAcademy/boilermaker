import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartProductsThunk} from '../store/cart_store'
import axios from 'axios'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      productTemps: []
    }
    this.getCartId = this.getCartId.bind(this)
    this.getProductInfo = this.getProductInfo.bind(this)
  }

  async componentDidMount() {
    const cartId = await this.getCartId()
    this.props.populateCart(cartId)
    const productTemplates = this.props.products.map(async product => {
      const singleProduct = await this.getProductInfo(product.productId)
      return singleProduct
    })
    console.log('Product templates:', productTemplates)
    this.setState({productTemps: productTemplates})
  }

  async getCartId() {
    const cartIdObj = await axios.get('/api/cartProducts/session')
    const cartId = cartIdObj.data.cartId
    return cartId
  }

  async getProductInfo(productId) {
    const productObj = await axios.get(`/api/products/${productId}`)
    const product = productObj.data
    return product
  }

  render() {
    return (
      <div className="cart">
        <h2>Cart</h2>
        {this.state.productTemps.map(product => {
          console.log(product)
          return <div>{product.name}</div>
        })}
      </div>
    )
  }
}

const mapState = state => ({
  products: state.cart.products
})

const mapDispatch = dispatch => ({
  populateCart: cartId => dispatch(getCartProductsThunk(cartId))
})

const connectedCart = connect(
  mapState,
  mapDispatch
)(Cart)

export default connectedCart
