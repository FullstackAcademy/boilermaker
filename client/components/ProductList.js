import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProductsThunk} from '../store/products'

class ProductList extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getProducts()
  }
  render() {
    return (
      <div className="product-list">
        {this.props.products.map(product => {
          return (
            <div className="product-block">
              <h2>{product.name}</h2>
              <div>
                <h3> Price: ${product.price} </h3>
              </div>
              <img className="product-img" src={product.imageUrl} />
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products.products
})

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getProductsThunk())
})

const ConnectedProductList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList)

export default ConnectedProductList
