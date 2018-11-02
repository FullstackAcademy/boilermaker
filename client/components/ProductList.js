import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProductsThunk} from '../store/products'
import {Link} from 'react-router-dom'
import {addToCartButtonThunk, getCartProductsThunk} from '../store/cart'
import axios from 'axios'

class ProductList extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getProducts()
    this.props.getCartProducts(1)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({state: 're-rendered'})
  }

  render() {
    return (
      <div className="product-list">
        {this.props.products.map(product => {
          return (
            <div className="product-block" key={product.id}>
              <Link to={'/products/' + product.id} key={product.id}>
                <div>
                  <h2>{product.name}</h2>
                </div>
                <div>
                  <h3> Price: ${product.price} </h3>
                </div>
                <div>
                  <img className="product-img" src={product.imageUrl} />
                </div>
              </Link>
              <form
                onSubmit={this.handleSubmit}
                onClick={() => {
                  console.log('state on click', this.state)
                  this.props.addCartButton(product.id, this.props.cartProducts)
                }}
              >
                <button type="submit">Add to cart</button>
              </form>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products.all,
  cartProducts: state.cart
})

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getProductsThunk()),
  addCartButton: (productId, cart) =>
    dispatch(addToCartButtonThunk(productId, cart)),
  getCartProducts: cartId => dispatch(getCartProductsThunk(cartId))
})

const ConnectedProductList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList)

export default ConnectedProductList
