import React, {Component} from 'react'
import Webcam from 'react-webcam'
import {Button, Header, Image, Modal} from 'semantic-ui-react'
import axios from 'axios'
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user'
}

const WebcamModal = () => {
  const webcamRef = React.useRef(null)

  const capture = React.useCallback(
    async () => {
      const imgSrc = webcamRef.current.getScreenshot()
      const config = {
        headers: {
          'X-Custom-Header': Math.random(),
          'Access-Control-Allow-Origin': '*'
        }
      }
      console.log(imgSrc)
      const res = await axios.post(
        'http://allsignpython.herokuapp.com/result',
        {imgSrc},
        config
      )
      console.log(res)
    },
    [webcamRef]
  )

  return (
    <Modal trigger={<Button id="webcam-button">Show Modal</Button>}>
      <Modal.Header>Submit a Photo</Modal.Header>
      <Modal.Content image>
        <>
          <Webcam
            audio={false}
            height={250}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={500}
            videoConstraints={videoConstraints}
          />
        </>
        <Modal.Description>
          <Header>Make the displayed hand sign</Header>
          <p>Please keep the hand used to sign in the box for the photo</p>
          <p>Is it okay to use this photo?</p>
          <Button onClick={capture}>Take Photo</Button>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

export default WebcamModal
