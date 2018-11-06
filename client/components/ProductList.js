import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProductsThunk} from '../store/products_store'
import {Link} from 'react-router-dom'
import {addToCartButtonThunk, getCartProductsThunk} from '../store/cart_store'
import axios from 'axios'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
})

class ProductList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      added: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getProducts()
    this.props.sessionCartId
      ? this.props.getCartProducts(this.props.sessionCartId)
      : null
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({state: 're-rendered'})
  }

  render() {
    const {classes} = this.props

    // console.log('cartproducts in state', this.props.cartProducts)
    // console.log('this.props.sessioncartid', this.props.sessionCartId)
    return (
      <div>
        {this.state.added ? <p>Added to cart!</p> : null}
        <div className="product-list">
          <Grid
            container
            space={12}
            style={{padding: 12}}
            className="all-products"
            spacing={24}
          >
            {this.props.products.map(product => {
              return (
                <Grid item xs={8} sm={6} lg={4} xl={3}>
                  <Paper className={classes.paper}>
                    <Link to={'/products/' + product.id} key={product.id}>
                      <div>
                        <img className="product-img" src={product.imageUrl} />
                      </div>
                      <div>
                        <p>
                          {product.name} - ${product.price}
                        </p>
                      </div>
                    </Link>
                    <form
                      onSubmit={this.handleSubmit}
                      onClick={() => {
                        this.props.addCartButton(
                          product.id,
                          this.props.cartProducts
                        )
                        this.props.getCartProducts(this.props.sessionCartId)
                        this.setState({added: true})
                      }}
                    >
                      <button type="submit">Add to cart</button>
                    </form>
                  </Paper>
                </Grid>
              )
            })}
          </Grid>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products,
  cartProducts: state.cart.products,
  sessionCartId: state.cart.sessionCartId
})

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getProductsThunk()),
  addCartButton: (productId, cart) =>
    dispatch(addToCartButtonThunk(productId, cart)),
  getCartProducts: cartId => dispatch(getCartProductsThunk(cartId))
})

ProductList.propTypes = {
  classes: PropTypes.object.isRequired
}

const styledProductList = withStyles(styles)(ProductList)

const ConnectedProductList = connect(
  mapStateToProps,
  mapDispatchToProps
)(styledProductList)

export default ConnectedProductList
