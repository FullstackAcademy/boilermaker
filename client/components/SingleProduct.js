import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProductThunk} from '../store/products'

class SingleProduct extends Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id)
  }
  render() {
    return (
      <div>
        {this.props.product.name} --
        {this.props.product.price} --
        <img className="product-img" src={this.props.product.imageUrl} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  product: state.products.single
})

const mapDispatchToProps = dispatch => ({
  getProduct: path => dispatch(getSingleProductThunk(path))
})

const ConnectedSingleProduct = connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleProduct)

export default ConnectedSingleProduct
