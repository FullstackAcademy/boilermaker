import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Router } from 'react-router-dom'
import history from './history'
import { Main, Login, Signup, Channel, Home, UserNamePrompt, Category, Categories, UserPage } from './components'
import { me, fetchChannels, fetchUsers, fetchCategories } from './store'

class Routes extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn } = this.props

    return (
      <Router history={history}>
        <Main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/channels/:channelName" component={Channel} />

            <Route path="/categories/:categoryName/channels" component={Category} />
            <Route path="/categories" component={Categories} />

            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/new-user/:userId" component={UserNamePrompt} />
            <Route path="/users/:userId" component={UserPage} />
            {
              isLoggedIn &&
              <Switch>
                {/* <Route path="/home" component={UserHome} /> */}
              </Switch>
            }
            <Route component={Login} />
          </Switch>
        </Main>
      </Router>
    )
  }
}

const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.me.id,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(fetchChannels())
      dispatch(fetchUsers())
      dispatch(fetchCategories())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)