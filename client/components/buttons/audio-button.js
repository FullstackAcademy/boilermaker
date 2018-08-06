import React from 'react'

class AudioButton extends React.Component{

  constructor(props){
    super(props)
  }

  handleClick(e) {
    e.preventDefault()
    console.log('testing stuff')
  }

  render() {
    return(
      <div>
        <button onClick={this.handleClick}> audioButton </button>
      </div>
    )
  }
}

export default AudioButton
