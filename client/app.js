import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import Map from './components/map'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <Map />
    </div>
  )
}

export default App
