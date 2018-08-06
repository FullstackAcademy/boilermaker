import React from 'react'
import { connect } from 'react-redux'
import {AudioButton, VideoButton} from './buttons'
import { addPeerThunk } from '../store'

class VideoTestComponent extends React.Component {

  constructor() {
    super()

    //html references
    this.videoLocal          = React.createRef();
    this.refButtonConnect    = React.createRef();
    this.refButtonDisconnect = React.createRef();
    this.refButtonSend       = React.createRef();
    this.refInputBox         = React.createRef();
    this.refReceiveBox       = React.createRef();

    //connections peers
    this.localConnection  = null
    this.sendChannel      = null
    this.remoteConnection = null

    this.state = {
      /* We'll use this to store any active connections so we can get to them later. */
      name: undefined,
      nameInput: '',
      channelName: undefined,
      connections: []
    }

    this.dataChannelOptions = {
      ordered: false, // do not guarantee order
      maxRetransmitTime: 3000, // in milliseconds
    }

    /* mediaConstrainsts*/
    this.mediaConstraints =  {
      video: true,
      audio: true
    }

    this.handleNameInput = this.handleNameInput.bind(this)
    this.setName = this.setName.bind(this)
    this.connectPeers = this.connectPeers.bind(this)
    this.startup = this.startup.bind(this)
  }

  componentDidMount(){
    //promise to get access to the user media device

    //only two lines of code to create a Data Channel Object
    //this line creates a peer connection:
    const peerConnection = new RTCPeerConnection();

    //this line creates a dataChannel 'object'
    var dataChannel = peerConnection.createDataChannel('myChannel', this.dataChannelOptions);

    this.startup()

    }

  startup() {
    this.connectButton    = this.refButtonConnect.current
    this.disconnectButton = this.refButtonDisconnect.current
    this.sendButton       = this.refButtonSend.current
    this.messageInputBox  = this.refInputBox.current
    this.receiveBox       = this.refReceiveBox.current

    // Set event listeners for user interface widgets

    this.connectButton.addEventListener('click', connectPeers, false);
    this.disconnectButton.addEventListener('click', disconnectPeers, false);
    this.sendButton.addEventListener('click', sendMessage, false);
  }

  connectPeers() {
    console.log('hello world')
    // Create the local connection and its event listeners
    this.localConnection = new RTCPeerConnection();

    // Create the data channel and establish its event listeners
    this.sendChannel = localConnection.createDataChannel('sendChannel');
    this.sendChannel.onopen = handleSendChannelStatusChange;
    this.sendChannel.onclose = handleSendChannelStatusChange;

    // Create the remote connection and its event listeners
    this.remoteConnection = new RTCPeerConnection();
    this.remoteConnection.ondatachannel = receiveChannelCallback;

    // Set up the ICE candidates for the two peers
    this.localConnection.onicecandidate = e => !e.candidate
        || remoteConnection.addIceCandidate(e.candidate)
        .catch(handleAddCandidateError);

    this.remoteConnection.onicecandidate = e => !e.candidate
        || localConnection.addIceCandidate(e.candidate)
        .catch(handleAddCandidateError);

    // Now create an offer to connect; this starts the process
    this.localConnection.createOffer()
    .then(offer => localConnection.setLocalDescription(offer))
    .then(() => remoteConnection.setRemoteDescription(localConnection.localDescription))
    .then(() => remoteConnection.createAnswer())
    .then(answer => remoteConnection.setLocalDescription(answer))
    .then(() => localConnection.setRemoteDescription(remoteConnection.localDescription))
    .catch(handleCreateDescriptionError);
  }


  sendToOneUser(target, msgString) {
    let isUnique = true;
    for (let i = 0; i < this.state.connections.length; i++) {
      if (this.state.connections[i].username === target) {
        this.state.connections[i].sendUTF(msgString);
        break;
      }
    }
  }

  async invite(evt){
    if (peerConnection) {
      alert('peer connection already exists.  cannot make another call')
    } else {
      let connection = 'channel name'
      let channelName = connection

      let videoLocal = this.videoLocal.current

      let userMedia = await navigator.mediaDevices.getUserMedia(this.mediaConstraints)
      videoLocal.src = connection.addStream(userMedia)
    }
  }

  sendToServer(msg) {
    var msgJSON = JSON.stringify(msg);
    connection.send(msgJSON);
  }

  async getUserMedia(){
    let videoRemote = this.videoRemote.current
    navigator.mediaDevices.getUserMedia(this.mediaConstraints)
    .then((stream) => {
      videoRemote.src = window.URL.createObjectURL(stream);
    })
    .catch((err) => {
      console.log('Error. WebRTC is not supported!');
    });
    }

  hasUserMedia(){
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;
    return !!navigator.getUserMedia;
  }

  handleNameInput(e){
    this.setState({
      nameInput: e.target.value
    })
  }

  setName(e){
    e.preventDefault()
    this.setState({
      name: this.state.nameInput
    })
    this.props.addPeer(this.state.nameInput)
  }

  render(){
    return (
      <div>
        { this.state.name ?
          <h1> {this.state.name} </h1> :
          <form>
          <div>
            <label > Name </label>
            <input
              className="title"
              value={this.state.nameInput}
              onChange={this.handleNameInput}
              type="text" />
          </div>
          <button type="submit" onClick={this.setName} > SUBMIT </button>
          </form>
        }

        <video ref={this.videoRemote}  autoPlay />
        <video ref={this.videoLocal}  autoPlay />

        <VideoButton callFunction={this.invite} />
        <AudioButton />


        <button ref={this.refButtonConnect}>
          Connect
        </button>
        <button ref={this.refButtonDisconnect}>
          Disconnect
        </button>

        <div className="messagebox">
          <label htmlFor="message">Enter a message:
            <input
ref={this.refInputBox} type="text" name="message" id="message" placeholder="Message text"
              inputMode="latin" size={60} maxLength={120} disabled />
          </label>
          <button ref={this.refButtonSend} name="sendButton" className="buttonright" disabled>
            Send
          </button>
        </div>

        <div ref={this.refReceiveBox} className="messagebox" >
          <p>Messages received:</p>
        </div>

      </div>
    )
  }


}

const mapState = (store) => {
  return {
    peerList: store.peerList
  }
}

const mapDispatch = (dispatch) => {
  return {
    addPeer: (peer) => {
      return dispatch(addPeerThunk(peer))
    }
  }
}

export default connect(mapState, mapDispatch)(VideoTestComponent)


/*

    if (this.hasUserMedia()) {
    navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

    var videoLocal = this.videoLocal.current;


*/
