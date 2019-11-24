import React, {Component} from 'react'
import axios from 'axios'
// import Camera from './camera.js'
// import Photo from './photo.js'
import * as tf from '@tensorflow/tfjs'
import Webcam from 'react-webcam'
const html = require('../../public/model.html')
const template = {__html: html}
class Interactive extends Component {
  // constructor(){
  //   super()
  //   this.state={
  //     htmlFile
  //   }
  // }
  // componentDidMount(){
  //   const request = axios.get('../../public/model.html')
  //   this.setState({htmlFile:request})
  // }
  render() {

    return (
      <div dangerouslySetInnerHTML={template} />
    //   <div>
    //     <Webcam />
    //         <button type="button" onClick={init}>Start</button>
    //   </div>
    )
  }
}
export default Interactive
// }
// async function init(){
//     let model, webcam, labelContainer, maxPredictions;
//     const modelURL = '../../public/models/model.json'
//     const metadataURL = '../../public/models/metadata.json'
//     model = await tf.load(modelURL, metadataURL);
//     maxPredictions = model.getTotalClasses();
//     webcam = new tf.Webcam(200, 200, true)
    
//     await webcam.setup(); // request access to the webcam
//     await webcam.play();
//     window.requestAnimationFrame(loop);
//     document.getElementById("webcam").appendChild(webcam.canvas)
//     labelContainer = document.getElementById("label");
//         for (let i = 0; i < maxPredictions; i++) { // and class labels
//             labelContainer.appendChild(document.createElement("div"));
//         }
// }
// async function loop() {
//     webcam.update(); 
//     await predict();
//     window.requestAnimationFrame(loop);
// }

// async function predict() {
//     const prediction = await model.predict(webcam.canvas);
//     for (let i = 0; i < maxPredictions; i++) {
//         const classPrediction =
//         prediction[i].className + ": " + prediction[i].probability.toFixed(2);
//         labelContainer.childNodes[i].innerHTML = classPrediction;
//     }
// }

// class Interactive extends Component{
//     constructor(){
//     super();

//     this.state = {
//     constraints: { audio: false, video: { width: 400, height: 300 } }
//     };

//     this.handleStartClick = this.handleStartClick.bind(this);
//     this.takePicture = this.takePicture.bind(this);
//     this.clearPhoto = this.clearPhoto.bind(this);
//     }
//     componentDidMount(){
//                 const constraints = this.state.constraints;
//         const getUserMedia = (params) => (
//         new Promise((successCallback, errorCallback) => {
//             navigator.webkitGetUserMedia.call(navigator, params, successCallback, errorCallback);
//         })
//         );

//         getUserMedia(constraints)
//         .then((stream) => {
//         const video = document.querySelector('video');

//         const mediaStream = new MediaStream();
//         video.srcObject = mediaStream
//         video.play();
//         })
//         .catch((err) => {
//         console.log(err);
//         });

//         this.clearPhoto();
//     }
// clearPhoto = () => {
//     const canvas = document.querySelector('canvas');
// const photo = document.getElementById('photo');
// const context = canvas.getContext('2d');
// const { width, height } = this.state.constraints.video;
// context.fillStyle = '#FFF';
// context.fillRect(0, 0, width, height);

// const data = canvas.toDataURL('image/png');
// photo.setAttribute('src', data);
// }
// handleStartClick=(event)=>{
//     event.preventDefault();
//     this.takePicture();
// }
// takePicture = () =>{
//     const canvas = document.querySelector('canvas');
// const context = canvas.getContext('2d');
// const video = document.querySelector('video');
// const photo = document.getElementById('photo');
// const { width, height } = this.state.constraints.video;

// canvas.width = width;
// canvas.height = height;
// context.drawImage(video, 0, 0, width, height);

// const data = canvas.toDataURL('image/png');
// photo.setAttribute('src', data);
// }
// render(){
//     return (
//         <div className="capture"

//         >
//           <Camera
//             handleStartClick={ this.handleStartClick }
//           />
//           <canvas id="canvas"

//             hidden
//           ></canvas>
//           <Photo />
//         </div>
//       );
// }
// }
// export default Interactive
