import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, Switch, Router} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Navbar, Login, Signup, FrontPage, UserList} from './components'
import {me, getProductsThunk, fetchItems, fetchOrders, postItem } from './store'
import ProductList from './components/product/ProductList'
import OrderHistoryDetails from './components/order/OrderHistoryDetails'
import OrderHistoryContainer from './components/order/OrderHistoryContainer'
import { authUserCart, unAuthUserCart } from './components/order/CartList'
import SingleProduct from './components/product/SingleProduct'
import Search from './components/product/Search'
import OrderCheckout from './components/order/OrderCheckout'
import RamenStory from './components/RamenStory'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData() //this takes care of orders when user is returned...
    this.props.loadProducts()
  }

  render () {
    const {isLoggedIn, items} = this.props

    return (
      <div>
        <Router history={history}>
          <div>
            <Navbar />
            <Switch>
              {/* Routes placed here are available to all visitors */}
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              {/* Displays our Login component as a fallback */}
              <Route exact path="/shopall" component={ProductList} />
              <Route exact path="/category/:categoryId" component={ProductList} />
              <Route exact path="/products/:productId" component={SingleProduct} />
							<Route exact path="/orders-history/" component={OrderHistoryContainer} />
              <Route exact path="/authUserCart" component={authUserCart} />
              <Route exact path="/unAuthUserCart" component={unAuthUserCart} />
              <Route exact path="/orders/:orderId" component={OrderHistoryDetails} />
              <Route exact path="/orders-checkout" render={() => <OrderCheckout items={items} />} />
              <Route exact path="/products/:productId" component={SingleProduct} />
              <Route exact path="/ramen-story" component={RamenStory} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/users" component={UserList} />
              <Route path="/" component={FrontPage} />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    items: state.cartItems
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    loadInitialData () {
      dispatch(me())
    },
    loadProducts () {
      dispatch(getProductsThunk())
    },
    getAllCartItems(userId) {
      dispatch(fetchItems(userId))
    },
    postItem(item) {
      dispatch(postItem(item))
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
