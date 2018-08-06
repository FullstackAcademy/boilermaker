import React from 'react'

class VideoButton extends React.Component{

  constructor(props){
    super(props)
  }

  handleClick(e) {
    e.preventDefault()
    console.log('testing stuff')
    //this.props.callFunction()
  }

  render() {
    console.log('this.props ish: ', this.props)
    return (
      <div>
        <button onClick={this.handleClick}> VideoButton </button>
      </div>
    )
  }
}

export default VideoButton
