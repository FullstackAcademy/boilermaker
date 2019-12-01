import React, {Component} from 'react'
import Camera from 'react-camera'
import {Button, Header, Image, Modal} from 'semantic-ui-react'

class Webcam extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  render() {
    return (
      <Modal trigger={<Button id="webcam-button">Show Modal</Button>}>
        <Modal.Header>Submit a Photo</Modal.Header>
        <Modal.Content image>
          <Camera
            ref={cam => {
              this.camera = cam
            }}
          />
          <img
            ref={img => {
              this.img = img
            }}
          />
          <Modal.Description>
            <Header>Make the displayed hand sign</Header>
            <p>Please keep the hand used to sign in the box for the photo</p>
            <p>Is it okay to use this photo?</p>
            <Button onClick={this.handleClick}>Take Photo</Button>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
  handleClick(e) {
    e.preventDefault()
    this.camera.capture().then(blob => {
      this.img.src = URL.createObjectURL(blob)
    })
  }
}

export default Webcam
