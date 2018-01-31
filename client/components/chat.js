import React, { Component } from 'react';
import { connect } from 'react-redux';
import { socket } from '../socket';
//import Button from 'react-bootstrap/lib/Button';
//import Input from 'react-bootstrap/lib/Input';
//import Panel from 'react-bootstrap/lib/Panel';
import { Button, Panel, Grid, Row, Col } from 'react-bootstrap';
import ReactDom from 'react-dom';
//import { newMessage } from '../store';
import { Widget, toggleWidget, addResponseMessage } from 'react-chat-widget';

// function sendMessage(evt) {
//   evt.preventDefault();
//   let message = evt.target.input.value;
//   socket.emit('message', message);
//   evt.target.input.value = '';
// }

// function Chat(props) {
//   const { messages, currChannel } = props;
//   return (
//     <div>
//       <Panel id='main-chat-room' className='chat'>
//         <Panel.Heading>{currChannel}</Panel.Heading>
//         <Panel.Body>
//           {messages.map((message, i) => {
//             return (
//               <p key={`chat-message-${i}`} className='chat-message'>{message}</p>
//             )
//           })}
//         </Panel.Body>
//       </Panel>
//       <form id="send-message" onSubmit={sendMessage}>
//         <input
//           id='chat-input' name="input"
//         /><Button type="submit">Send</Button>
//       </form>
//     </div>
//   )
// }

class Chat extends Component {

  componentDidMount() {
    toggleWidget()
  }

  handleNewUserMessage = (message) => {
    socket.emit('message', message)
  }

  render() {
    return (
      <Widget
      title={this.props.currChannel}
      subtitle="Type responsibly"
      handleNewUserMessage={this.handleNewUserMessage}
      />
    )
  }
}


const mapState = (state) => {
  return {
    messages: state.messages,
    currChannel: state.currChannel
  }
}


// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState)(Chat)