import React from 'react'

import {Navbar, Login, Signup} from './components'
import AllCourses from './components/AllCourses'
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
        <Route path="/courses" component={AllCourses} />
      </Switch>
    </div>
  )
}

export default App
