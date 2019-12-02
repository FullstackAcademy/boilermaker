import React, {Component} from 'react'
import axios from 'axios'
// import Camera from './camera.js'
// import Photo from './photo.js'
import * as tf from '@tensorflow/tfjs'
import WebcamModal from './Camera'
import {webcam} from '@tensorflow/tfjs-data'

const Interactive = () => {
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
        'https://allsignpython.herokuapp.com/result',
        {imgSrc},
        config
      )
      console.log(res)
    },
    [webcamRef]
  )

  return (
    <>
      <Webcam
        audio={false}
        height={250}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={500}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>
    </>
  )
}
export default Interactive
