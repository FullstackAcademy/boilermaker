import React from 'react'

export default function Welcome() {
  return (
    <main role="main" className="inner cover">
      <h1 Name="cover-heading">Welcome to Steam.</h1>
      <p className="lead">
        Stream is an application that allows you to choose a mood for
        meditation, and will return a playlist to play on your spotify device.
        To start, log in with Spotify on our navigation bar and make sure to
        have spotify open in your backgorund first! The application was built to
        test Spotify's Web API. In it's next stage, the application will work
        with iphone devices.
      </p>
      <p className="lead">
        <a href="#" className="btn btn-lg btn-secondary">
          Learn more
        </a>
      </p>
    </main>
  )
}
