import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, Switch, Router} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Navbar, Login, Signup, UserHome, FrontPage} from './components'
import {me, getProductsThunk } from './store'
import ProductList from './components/product/ProductList';
import OrderHistoryDetails from './components/order/OrderHistoryDetails'
import OrderHistoryContainer from './components/order/OrderHistoryContainer'
import CartList from './components/order/CartList'
import SingleProduct from './components/product/SingleProduct'
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
    this.props.loadProducts()
  }

  render () {
    const {isLoggedIn} = this.props

    return (
      <div>
        <Router history={history}>
          <div>
            <Navbar />
            <Switch>
              {/* Routes placed here are available to all visitors */}
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              {
                isLoggedIn &&
                  <Switch>
                    {/* Routes placed here are only available after logging in */}
                    <Route path="/home" component={UserHome} />
                  </Switch>
              }
              {/* Displays our Login component as a fallback */}
              <Route exact path="/shopall" component={ProductList} />
              <Route exact path="/category/:categoryId" component={ProductList} />
              <Route exact path="/" component={FrontPage} />
              <Route exact path="/products/:productId" component={SingleProduct} />
							<Route exact path="/order-history" component={OrderHistoryContainer} />
              <Route exact path="/cart-list" component={CartList} />
							<Route path="/orders/:orderId" component={OrderHistoryDetails} />
              <Route path="/products/:productId" component={SingleProduct} />
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
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
    },
    loadProducts () {
      dispatch(getProductsThunk())
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
