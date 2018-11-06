import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProductThunk} from '../store/products_store'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

class SingleProduct extends Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id)
  }
  render() {
    console.log('props', this.props.product)
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
  product: state.products[0]
})

const mapDispatchToProps = dispatch => ({
  getProduct: path => dispatch(getSingleProductThunk(path))
})

const ConnectedSingleProduct = connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleProduct)

export default ConnectedSingleProduct
