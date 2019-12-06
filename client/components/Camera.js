import React, {Component} from 'react'
import Webcam from 'react-webcam'
import {Button, Header, Image, Modal} from 'semantic-ui-react'
import axios from 'axios'
import * as tf from '@tensorflow/tfjs'
import * as tmImage from '@teachablemachine/image'

const WebcamModal = () => {
  const URL = 'https://teachablemachine.withgoogle.com/models/NeX9xVyz/'

  let model, webcam, labelContainer, maxPredictions

  // Load the image model and setup the webcam
  async function init() {
    // const uploadModel = document.getElementById('upload-model');
    // const uploadWeights = document.getElementById('upload-weights');
    // const uploadMetadata = document.getElementById('upload-metadata');
    // console.log(uploadModel)
    // model = await tmImage.loadFromFiles(uploadModel.files[0], uploadWeights.files[0], uploadMetadata.files[0])
    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    const modelURL = URL + 'model.json'
    const metadataURL = URL + 'metadata.json'

    model = await tmImage.load(modelURL, metadataURL)
    maxPredictions = model.getTotalClasses()

    // Convenience function to setup a webcam
    const flip = true // whether to flip the webcam
    webcam = new tmImage.Webcam(200, 200, flip) // width, height, flip
    await webcam.setup() // request access to the webcam
    await webcam.play()
    window.requestAnimationFrame(loop)

    // append elements to the DOM
    document.getElementById('webcam-container').appendChild(webcam.canvas)
  }

  async function loop() {
    webcam.update() // update the webcam frame
    window.requestAnimationFrame(loop)
  }

  // run the webcam image through the image model
  async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas)
  }
  async function handleTest() {
    const handSign = await model.predict(webcam.canvas)
    console.log(handSign[0].probability)
    if (handSign[0].probability < 1 && handSign[0].probability > 0.7) {
      alert('That is 0')
    } else if (handSign[1].probability < 1 && handSign[1].probability > 0.7) {
      alert('That is 1')
    } else if (handSign[2].probability < 1 && handSign[2].probability > 0.7) {
      alert('That is 2')
    } else if (handSign[3].probability < 1 && handSign[3].probability > 0.7) {
      alert('That is 3')
    } else if (handSign[4].probability < 1 && handSign[4].probability > 0.7) {
      alert('That is 4')
    } else if (handSign[5].probability < 1 && handSign[5].probability > 0.7) {
      alert('That is 5')
    } else if (handSign[6].probability < 1 && handSign[6].probability > 0.7) {
      alert('That is 6')
    } else if (handSign[7].probability < 1 && handSign[7].probability > 0.7) {
      alert('That is 7')
    } else if (handSign[8].probability < 1 && handSign[8].probability > 0.7) {
      alert('That is 8')
    }
  }

  return (
    <Modal onOpen={init} trigger={<Button id="webcam-button">Start</Button>}>
      <Modal.Header>Submit a Photo</Modal.Header>
      <Modal.Content image>
        <>
          <div id="webcam-container" />
        </>
        <Modal.Description>
          <Header>Make the displayed hand sign</Header>
          <p>Please keep the hand used to sign in the box for the photo</p>
          {/* <input id='upload-model' type='file'/> 
         <input id='upload-weights' type='file'/>
          <input id='upload-metadata' type='file'/> */}
          {/* <Button onClick={init}>Start</Button> */}
          <Button onClick={handleTest}>Test</Button>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

export default WebcamModal
