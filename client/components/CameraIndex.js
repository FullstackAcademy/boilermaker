import React, {Component} from 'react'
import Webcam from 'react-webcam'
import {Button, Header, Image, Modal} from 'semantic-ui-react'
import axios from 'axios'
import * as tf from '@tensorflow/tfjs'
import * as tmImage from '@teachablemachine/image'

const videoConstraints = {
  width: 224,
  height: 224,
  facingMode: 'user'
}

const WebcamModal = () => {
  const URL = 'https://teachablemachine.withgoogle.com/models/NeX9xVyz/'

  let model, webcam, labelContainer, maxPredictions

  const webcamRef = React.useRef(null)

  const capture = React.useCallback(
    async () => {
      const modelURL = URL + 'model.json'
      const metadataURL = URL + 'metadata.json'

      // load the model and metadata
      // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
      // or files from your local hard drive
      // Note: the pose library adds "tmImage" object to your window (window.tmImage)
      model = await tmImage.load(modelURL, metadataURL)
      maxPredictions = model.getTotalClasses()

      labelContainer = document.getElementById('label-container')
      for (let i = 0; i < maxPredictions; i++) {
        // and class labels
        labelContainer.appendChild(document.createElement('div'))
      }
      try {
        const imgSrc = webcamRef.current.getScreenshot()
        const imgElem = await document.createElement('img')
        imgElem.id = 'imgSrc'
        imgElem.src = imgSrc
        predict(imgElem)
      } catch (error) {
        console.log(error)
      }
    },
    [webcamRef]
  )
  async function predict(img) {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(img)
    for (let i = 0; i < maxPredictions; i++) {
      const classPrediction =
        prediction[i].className + ': ' + prediction[i].probability.toFixed(2)
      labelContainer.childNodes[i].innerHTML = classPrediction
      console.log(classPrediction)
    }
  }
  return (
    <Modal trigger={<Button id="webcam-button">Start</Button>}>
      <Modal.Header>Submit a Photo</Modal.Header>
      <Modal.Content image>
        <>
          <Webcam
            mirrored={true}
            audio={false}
            height={224}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={224}
            videoConstraints={videoConstraints}
          />
          <div id="label-container" />
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
