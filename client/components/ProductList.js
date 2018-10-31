import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProductsThunk} from '../store/products'
import axios from 'axios'

class ProductList extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getProducts()
  }

  async addToCart(productId) {
    try {
      const newCartResponse = await axios.post('/api/carts', {})
      const newCart = newCartResponse.data
      const newProductInCartResponse = await axios.post('api/cartProducts', {
        productId,
        cartId: newCart.id,
        quantity: 1
      })
      const newProductInCart = newProductInCartResponse.data
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div className="product-list">
        {this.props.products.map(product => {
          return (
            <div className="product-block">
              <div>
                <h2>{product.name}</h2>
              </div>
              <div>
                <h3> Price: ${product.price} </h3>
              </div>
              <div>
                <img className="product-img" src={product.imageUrl} />
              </div>
              <button onClick={() => this.addToCart(product.id)}>
                Add to cart
              </button>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getProductsThunk())
})

const ConnectedProductList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList)

export default ConnectedProductList
