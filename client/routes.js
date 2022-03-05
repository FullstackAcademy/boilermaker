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
  // notFoundpage
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
            <Route path="/userhome" component={UserHome} />
            <Route exact path="/pizzas" component={AllPizzas} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/checkoutsuccess" component={CheckoutSuccess} />
            <Route exact path="/:id" component={SinglePizza} />
            {/* <Route exact path="/*" component={notFoundpage} /> */}
             <Redirect to="/userhome" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/home" exact component={HomePage} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/pizzas" component={AllPizzas} />
            {/* <Route path="/*" component={notFoundpage} /> */}
            {/* <Redirect to='/' /> */}

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


