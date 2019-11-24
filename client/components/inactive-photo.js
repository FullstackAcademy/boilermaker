import React from 'react'
const Photo = props => (
  <div className="output">
    <img id="photo" alt="Your photo" />
    <a id="saveButton" onClick={props.handleSaveClick}>
      Save Photo
    </a>
  </div>
)
export default Photo
