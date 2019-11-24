<div>Teachable Machine Image Model</div>
<button type="button" onclick="init()">Start</button>
<div id="webcam-container"></div>
<div id="label-container"></div>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@teachablemachine/image@0.8/dist/teachablemachine-image.min.js"></script>
<script type="text/javascript">
    // More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image
    // the link to your model provided by Teachable Machine export panel
    const URL = "./my_model/";
    let model, webcam, labelContainer, maxPredictions;
    // Load the image model and setup the webcam
    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        // Note: the pose library adds "tmImage" object to your window (window.tmImage)
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
        webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);
        // append elements to the DOM
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }
    }
    async function loop() {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }
    // run the webcam image through the image model
    async function predict() {
        // predict can take in an image, video or canvas html element
        const prediction = await model.predict(webcam.canvas);
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;
        }
    }
</script>


// import React from "react";
// import ReactDOM from "react-dom";

// import * as cocoSsd from "@tensorflow-models/coco-ssd";
// import "@tensorflow/tfjs";
// import "./styles.css";

// class App extends React.Component {
//   videoRef = React.createRef();
//   canvasRef = React.createRef();

//   componentDidMount() {
//     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//       const webCamPromise = navigator.mediaDevices
//         .getUserMedia({
//           audio: false,
//           video: {
//             facingMode: "user"
//           }
//         })
//         .then(stream => {
//           window.stream = stream;
//           this.videoRef.current.srcObject = stream;
//           return new Promise((resolve, reject) => {
//             this.videoRef.current.onloadedmetadata = () => {
//               resolve();
//             };
//           });
//         });
//       const modelPromise = cocoSsd.load();
//       Promise.all([modelPromise, webCamPromise])
//         .then(values => {
//           this.detectFrame(this.videoRef.current, values[0]);
//         })
//         .catch(error => {
//           console.error(error);
//         });
//     }
//   }

//   detectFrame = (video, model) => {
//     model.detect(video).then(predictions => {
//       this.renderPredictions(predictions);
//       requestAnimationFrame(() => {
//         this.detectFrame(video, model);
//       });
//     });
//   };

//   renderPredictions = predictions => {
//     const ctx = this.canvasRef.current.getContext("2d");
//     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
//     // Font options.
//     const font = "16px sans-serif";
//     ctx.font = font;
//     ctx.textBaseline = "top";
//     predictions.forEach(prediction => {
//       const x = prediction.bbox[0];
//       const y = prediction.bbox[1];
//       const width = prediction.bbox[2];
//       const height = prediction.bbox[3];
//       // Draw the bounding box.
//       ctx.strokeStyle = "#00FFFF";
//       ctx.lineWidth = 4;
//       ctx.strokeRect(x, y, width, height);
//       // Draw the label background.
//       ctx.fillStyle = "#00FFFF";
//       const textWidth = ctx.measureText(prediction.class).width;
//       const textHeight = parseInt(font, 10); // base 10
//       ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
//     });

//     predictions.forEach(prediction => {
//       const x = prediction.bbox[0];
//       const y = prediction.bbox[1];
//       // Draw the text last to ensure it's on top.
//       ctx.fillStyle = "#000000";
//       ctx.fillText(prediction.class, x, y);
//     });
//   };

//   render() {
//     return (
//       <div>
//         <video
//           className="size"
//           autoPlay
//           playsInline
//           muted
//           ref={this.videoRef}
//           width="600"
//           height="500"
//         />
//         <canvas
//           className="size"
//           ref={this.canvasRef}
//           width="600"
//           height="500"
//         />
//       </div>
//     );
//   }
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
