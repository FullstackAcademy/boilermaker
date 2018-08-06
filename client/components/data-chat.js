/*
https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Simple_RTCDataChannel_sample
*/
import React from 'react'

class DataChat extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      connectDisabled: false,
      disconnectDisabled: true,
      sendDisabled: true,
      messageInputDisabled: true,
      message: 'input words here',
      messages: []
    }

    //Ref instantiation
    this.refMessage = React.createRef()

    this.localConnection  = null;   // RTCPeerConnection for our "local" connection
    this.remoteConnection = null;  // RTCPeerConnection for the "remote"

    this.sendChannel      = null;       // RTCDataChannel for the local (sender)
    this.receiveChannel   = null;

    this.testString                       = '123'
    this.connectPeers                     = this.connectPeers.bind(this)
    this.disconnectPeers                  = this.disconnectPeers.bind(this)
    this.handleChange                     = this.handleChange.bind(this)
    this.handleCreateDescriptionError     = this.handleCreateDescriptionError.bind(this)
    this.handleLocalAddCandidateSuccess   = this.handleLocalAddCandidateSuccess.bind(this)
    this.handleRemoteAddCandidateSuccess  = this.handleRemoteAddCandidateSuccess.bind(this)
    this.handleAddCandidateError          = this.handleAddCandidateError.bind(this)
    this.sendMessage                      = this.sendMessage.bind(this)
    this.handleSendChannelStatusChange    = this.handleSendChannelStatusChange.bind(this)
    this.receiveChannelCallback           = this.receiveChannelCallback.bind(this)
    this.handleReceiveMessage             = this.handleReceiveMessage.bind(this)
    this.handleReceiveChannelStatusChange = this.handleReceiveChannelStatusChange.bind(this)
  }

  startup(){
//    let connectButton    = this.refConnectButton.current
//    let disconnectButton = this.refDisconnectButton.current
//    let sendButton       = this.refSendButton.current
//    let message          = this.refMessage.current
//    let receiveBox       = this.refReceiveBox.current

    // Set event listeners for user interface widgets
    //connectButton.addEventListener('click', this.connectPeers, false);
    //disconnectButton.addEventListener('click', this.disconnectPeers, false);
    //sendButton.addEventListener('click', this.sendMessage, false);
  }


  hello() {
    console.log('hello everybody')
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  connectPeers() {
    //setup local connection
    console.log(this.testString)
    this.localConnection = new RTCPeerConnection();

    this.sendChannel = this.localConnection.createDataChannel('SendChannel')
    this.sendChannel.onopen = this.handleSendChannelStatusChange
    this.sendChannel.onclose = this.handleSendChannelStatusChange

    //setup remote connection
    this.remoteConnection = new RTCPeerConnection();
    this.remoteConnection.ondatachannel = this.receiveChannelCallback;

    //setup ICE candidates
    this.localConnection.onicecandidate = (event) => !event.candidate
      || this.remoteConnection.addIceCandidate(event.candidate)
      .catch(this.handleAddCandidateError)

    this.remoteConnection.onicecandidate = event => !event.candidate
      || this.localConnection.addIceCandidate(event.candidate)
      .catch(this.handleAddCandidateError)

    //finally setup
    this.localConnection.createOffer()
      .then((offer) => this.localConnection.setLocalDescription(offer))
      .then(() => this.remoteConnection.setRemoteDescription(this.localConnection.localDescription))
      .then(() => this.remoteConnection.createAnswer())
      .then((answer) => this.remoteConnection.setLocalDescription(answer))
      .then(() => this.localConnection.setRemoteDescription(this.remoteConnection.localDescription))
      .then(() => console.log('localConnection.createOffer()'))
      .catch(this.handleCreateDescriptionError)
  }

  // Handle errors attempting to create a description;
  // this can happen both when creating an offer and when
  // creating an answer. In this simple example, we handle
  // both the same way.

  handleCreateDescriptionError(error) {
  }

  // Handle successful addition of the ICE candidate
  // on the "local" end of the connection.

  handleLocalAddCandidateSuccess() {
    this.setState({connectDisabled: true})
  }

  // Handle successful addition of the ICE candidate
  // on the "remote" end of the connection.

  handleRemoteAddCandidateSuccess() {
    this.setState({disconnectDisabled: false})
  }

  // Handle an error that occurs during addition of ICE candidate.

  handleAddCandidateError() {
    console.log('we are inside handleAddCandidateError,')
  }

  // Handles clicks on the "Send" button by transmitting
  // a message to the remote peer.

  //*changed from origina: set value to a react state
  sendMessage() {
    this.sendChannel.send(this.state.message)

    this.setState({
      message: ''
    })

    this.refMessage.current.focus()
  }

  // Handle status changes on the local end of the data
  // channel; this is the end doing the sending of data
  // in this example.

  //disabling handled through setting state instead of HTML
  handleSendChannelStatusChange(event) {
    if (this.sendChannel) {
      var state = this.sendChannel.readyState;

      if (state === 'open') {

        this.setState({
          connectDisabled: true,
          messageInputDisabled: false,
          disconnectDisabled: false,
          sendDisabled: false,
          message: ''
        })
        this.refMessage.current.focus();
      } else {

        this.setState({
          connectDisabled: false,
          messageInputDisabled: true,
          disconnectDisabled: true,
          sendDisabled: true,
          message: 'input words here',
        })
      }
    }
  }


  // Called when the connection opens and the data
  // channel is ready to be connected to the remote.

  receiveChannelCallback(event) {

    this.receiveChannel = event.channel;
    this.receiveChannel.onmessage = this.handleReceiveMessage;
    this.receiveChannel.onopen = this.handleReceiveChannelStatusChange;
    this.receiveChannel.onclose = this.handleReceiveChannelStatusChange;
  }

  // Handle onmessage events for the receiving channel.
  // These are the data messages sent by the sending channel.

  handleReceiveMessage(event) {
    //let el = document.createElement('p');
    //let txtNode = document.createTextNode(event.data);

    this.setState({
      messages: [...this.state.messages, event.data]
    })

    //el.appendChild(txtNode);
    //this.refReceiveBox.current.appendChild(el);
  }

  // Handle status changes on the receiver's channel.

  handleReceiveChannelStatusChange(event) {
    if (this.receiveChannel){
      console.log("Receive channel's status changed to " + this.receiveChannel.readyState)
    }
  }

  // Close the connection, including data channels if they're open.
  // Also update the UI to reflect the disconnected status.

  disconnectPeers() {
    this.sendChannel.close()
    this.receiveChannel.close()

    this.remoteConnection.close()
    this.localConnection.close()

    this.sendChannel = null
    this.receiveChannel = null
    this.remoteConnection = null
    this.localConnection = null

    this.setState({
      connectDisabled: false,
      disconnectDisabled: true,
      sendDisabled: true,
      messageInputDisabled: true,
      message: 'input words here',
    })
    console.log('in disconnect peers')
  }


  render() {
    return (
      <div>
        <div className="messagebox">
          <label htmlFor="message">Enter a message:
            <input
              ref         = {this.refMessage}
              type        = "text"
              name        = "message"
              id          = "message"
              placeholder = "Message text"
              value       = {this.state.message}
              inputMode   = "latin"
              size        = {60}
              maxLength   = {120}
              disabled    = {this.state.messageInputDisabled}
              onChange    = {this.handleChange}
             />
          </label>
          <button  onClick={this.sendMessage} id="sendButton" name="sendButton" className="buttonright" disabled={this.state.sendDisabled}>
            Send
          </button>
        </div>

        <div className="messagebox" id="receivebox">
          <p>Messages received:</p>
        </div>
        <div>
        {this.state.messages &&
          this.state.messages.map(
            (message) => <p> {message} </p>
          )
        }
        </div>

        <button onClick={this.connectPeers} id="connectButton" name="connectButton" className="buttonleft" disabled={this.state.connectDisabled} >
          Connect
        </button>
        <button onClick={this.disconnectPeers} id="disconnectButton" name="disconnectButton" className="buttonright" disabled={this.state.disconnectDisabled}>
          Disconnect
        </button>
      </div>
    )
  }
}

export default DataChat
