import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import '../public/app.scss'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
