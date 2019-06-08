import React from 'react'

import {Navbar, UploadForm} from './components'
import AddCompany from './components/add-company'
import Routes from './routes'

const App = () => {
  return (
    <div>
      {/* <Navbar /> */}
      {/* <Routes /> */}
      <UploadForm />
      <AddCompany />
    </div>
  )
}

export default App
