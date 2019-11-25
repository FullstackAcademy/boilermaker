import React from 'react'
import Sound from 'react-sound'
import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Sound
        url="https://raw.githubusercontent.com/D3Doritos/AllSign/82a34fdba889d1f8bc55cddad22c5b3e1598e0d8/Greta_Van_Fleet_Highway_Tune.mp3"
        autoLoad={true}
        playStatus={Sound.status.PLAYING}
      />
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
