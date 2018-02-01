import React from 'react';
import { connect } from 'react-redux';
import { Button, Panel } from 'react-bootstrap';

import { socket } from '../socket';

function sendMessage() {
  let message = $('#chat-input')[0].value;
  $('#chat-input')[0].value = '';
  socket.emit('message', message);
}

const Chat = props => {
  const { messages } = props;
  return (
    <Panel id='main-chat-room' className='chat'>
      <Panel.Body>
        {messages.map((message, i) => {
          return (
            <p key={`chat-message-${i}`} className='chat-message'>{message}</p>
          )
        })}
        <input
          id='chat-input'
        /><Button onClick={sendMessage}>Send</Button>
      </Panel.Body>
    </Panel>
  )
}

const mapState = (state) => {
  return {
    messages: state.messages
  }
}


// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState)(Chat)