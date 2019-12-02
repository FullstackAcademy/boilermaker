import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Footer, Navbar} from './components'
import {
  Login,
  Practice,
  Signup,
  Leaderboard,
  UserHome,
  EntryPage,
  Learn,
  Interactive,
  About,
  Profile,
  UpdateUser
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/home" component={EntryPage} />
        <Route path="/practice" component={Practice} />
        <Route path="/learn" component={Learn} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/about" component={About} />
        <Route path="/interactive" component={Interactive} />
        <Route path="/leaderboard" component={Leaderboard} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}

            <Route path="/home" component={EntryPage} />
            <Route path="/profile/:id/update" component={UpdateUser} />
            <Route path="/profile/:id/" component={Profile} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={EntryPage} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.loggedInUser.id || !!state.user.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
