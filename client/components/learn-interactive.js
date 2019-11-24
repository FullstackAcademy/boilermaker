import React, {Component} from 'react'
// import Camera from './camera.js'
// import Photo from './photo.js'
import Webcam from 'react-webcam'
class Interactive extends Component {
  render() {
    return (
      <div>
        <Webcam />
      </div>
    )
  }
}

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
export default Interactive
