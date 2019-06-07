import React from 'react'

import {Navbar, UploadForm} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <UploadForm />
    </div>
  )
}

export default App
