import React, {Component} from 'react'
import axios from 'axios'
// import Camera from './camera.js'
// import Photo from './photo.js'
import * as tf from '@tensorflow/tfjs'
import WebcamModal from './Camera'
import {webcam} from '@tensorflow/tfjs-data'

const Interactive = () => {
  return <WebcamModal />
}
export default Interactive
