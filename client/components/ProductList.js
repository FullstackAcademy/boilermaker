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
      <div>
        {this.props.products.map(product => {
          return (
            <div>
              {product.name} -- {product.price}
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {products: state.products.products}
}

const mapDispatchToProps = dispatch => {
  return {getProducts: () => dispatch(getProductsThunk())}
}

const ConnectedProductList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList)

export default ConnectedProductList
