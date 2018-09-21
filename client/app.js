import React from 'react'

import {Navbar, Login, Signup} from './components'
// import Routes from './routes'
import {Route, Switch} from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Navbar />
      {/* <Routes /> */}
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  )
}

export default App
