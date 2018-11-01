import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProductsThunk} from '../store/products'
import {getCartProductsThunk} from '../store/cart'
import {Link} from 'react-router-dom'
import axios from 'axios'

class ProductList extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getProducts()
    //this will eventually be called with req.session.id
    this.props.getCartProducts(1)
  }



  render() {
    return (
      <div className="product-list">
        {this.props.products.map(product => {
          return (
            <div className="product-block">
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
              <button onClick={() => this.addToCartThunk(product.id)}>
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
  products: state.products.all
})

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getProductsThunk()),
  getCartProducts: id => dispatch(getCartProductsThunk(id))
})

const ConnectedProductList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList)

export default ConnectedProductList
