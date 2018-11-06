import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getCartProductsThunk,
  getCartIdThunk,
  removeItemThunk
} from '../store/cart_store'
import {Link} from 'react-router-dom'

import axios from 'axios'

class Cart extends Component {
  constructor(props) {
    super(props)

    // this.getCartId = this.getCartId.bind(this)
    // this.getProductInfo = this.getProductInfo.bind(this)
    // this.populatesState = this.populatesState.bind(this)
  }

  componentDidMount() {
    // this.props.getSession() // state.cart.sessionCartId exists

    this.props.populateCart(this.props.cartId) //now state.cart.products is correct.
  }

  // async getCartId() {
  //   const cartIdObj = await axios.get('/api/cartProducts/session')
  //   const cartId = cartIdObj.data.cartId
  //   return cartId
  // }

  // async getProductInfo(productId) {
  //   const productObj = await axios.get(`/api/products/${productId}`)
  //   const product = productObj.data
  //   return product
  // }

  // async populatesState() {
  //   const resultingProducts = this.props.products.map(async product => {
  //     const singleProduct = await this.getProductInfo(product.productId)
  //     console.log('singleProduct', singleProduct)
  //     this.setState({productTemps: [...this.state.productTemps, singleProduct]})
  //   })
  //   console.log('CurrentState:', this.state)
  // }

  render() {
    console.log('prop.products', this.props.products)
    console.log('our props from redux store', this.props)
    if (!this.props.products.length) {
      return (
        <div className="cart">
          <h2>Your cart is empty!</h2>
          <Link to="/products">Start Shopping</Link>
        </div>
      )
    } else {
      return (
        <div className="cart">
          <h2>Cart</h2>
          <table>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity:</th>
            </tr>
            {this.props.allProducts
              .filter(allProduct => {
                return this.props.products
                  .map(product => product.productId)
                  .includes(allProduct.id)
              })
              .map(filteredProduct => {
                return (
                  <tr>
                    <td>{filteredProduct.name}</td>
                    <td>{filteredProduct.price}</td>
                    <td>
                      <form>
                        <label>
                          <input
                            type="text"
                            value={
                              this.props.products.filter(
                                product =>
                                  product.productId === filteredProduct.id
                              )[0].quantity
                            }
                          />
                        </label>
                      </form>
                      <button>+</button>
                      <button>-</button>
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          this.props.removeItem(filteredProduct.id)
                        }
                      >
                        {' '}
                        Remove{' '}
                      </button>
                    </td>
                  </tr>
                )
              })}

            {/* {this.state.productTemps.map((product, idx) => {
            return (
              <tr>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{this.props.products[idx].quantity}</td>
              </tr>
              )
            })} */}
          </table>
          <div>
            Total:
            {this.props.products.reduce((acc, current) => {
              return (
                acc +
                this.props.allProducts.filter(
                  product => product.id === current.productId
                )[0].price *
                  current.quantity
              )
            }, 0)}
          </div>
        </div>
      )
    }
  }
}

const mapState = state => ({
  cartId: state.cart.sessionCartId,
  products: state.cart.products,
  allProducts: state.products
})

const mapDispatch = dispatch => ({
  populateCart: cartId => dispatch(getCartProductsThunk(cartId)),

  getSession: () => dispatch(getCartIdThunk()),

  removeItem: id => dispatch(removeItemThunk(id))
})

const connectedCart = connect(
  mapState,
  mapDispatch
)(Cart)

export default connectedCart
