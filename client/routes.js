import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  withRouter,
  Route,
  Switch,
  BrowserRouter as Router,
  Link,
  Redirect
} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  AllPizzas,
  SinglePizza,
  Cart,
  UserHome,
  HomePage,
  Checkout,
  CheckoutSuccess,
  // AdminPage
  notFoundPage
} from './components'
import {me} from './store'
import 'bootstrap/dist/css/bootstrap.min.css'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/userhome" component={UserHome} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/checkoutsuccess" component={CheckoutSuccess} />
            <Route exact path="/pizzas" component={AllPizzas} />
            <Route exact path="/:id" component={SinglePizza} />
            <Route exact path="/*" component={notFoundPage} />
            <Redirect to="/userhome" />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/pizzas" component={AllPizzas} />
            <Route exact path="/:id" component={SinglePizza} />
            <Route path="/*" component={notFoundPage} />
            <Redirect to='/home' />

          </Switch>
        )}
      </div>

      // <Switch>
      //   {/* Routes placed here are available to all visitors */}

      //   {isLoggedIn && (
      //     <Switch>
      //       {/* Routes placed here are only available after logging in */}
      //       <Route path="/home" component={UserHome} />
      //     </Switch>
      //   )}
      //   {/* Displays our Login component as a fallback */}
      //   <Route component={Login} />
      // </Switch>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Routes))

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
