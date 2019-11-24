import React from 'react'
const Camera = props => (
  <div className="camera">
    <video id="video" />
    <a id="startButton" onClick={props.handleStartClick}>
      Take photo
    </a>
  </div>
)

export default Camera
