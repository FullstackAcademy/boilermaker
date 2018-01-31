import React, { Component } from 'react';
import { connect } from 'react-redux';
import { socket } from '../socket';
import { Button, Panel, Grid, Row, Col } from 'react-bootstrap';

class Chat extends Component {

  componentDidUpdate() {
    let chat = document.getElementById('chat-body')
    chat.scrollTop = chat.scrollHeight - 320;
  }

  sendMessage(evt) {
    evt.preventDefault();
    let message = evt.target.input.value;
    let username = this.props.user.userName;
    let messageObj = { message, username }
    socket.emit('message', messageObj);
    evt.target.input.value = '';
  }

  render() {
    const { messages, channel } = this.props;
    let name = '';

    channel.length > 12 ? name = channel.slice(0, 13) + '...' : name = channel

    return (
      <Grid>
        <Col xs={4} md={3} id='main-chat-room' className='chat'>
          <div xs={4} md={3} id="chat-room-header">{name}</div>
          <div id="chat-body">
            {messages.map((message, i) => {
              let dateEndIdx = message.indexOf(']');
              let date = message.slice(0, dateEndIdx + 1);
              let body = message.slice(dateEndIdx + 2);
              let nameEndIdx = body.indexOf(':');
              let name = body.slice(0, nameEndIdx);
              let text = body.slice(nameEndIdx + 2);
              let color = 'chat-message-';

              i % 2 === 0 ? color += 'even' : color += 'odd';

              return (
                <div key={`chat-message-${i}`} className={`${color}`}>
                  <div className="chat-message-header">
                    <p className='chat-message'>
                      <span className="message-author">{name}</span>
                      <span className="message-date">{date}</span>
                    </p>
                  </div>
                  <p className='chat-message'>{text}</p>
                </div>
              )
            })}
          </div>
          <form xs={4} md={3} id="send-message" onSubmit={this.sendMessage.bind(this)}>
            <input
              id='chat-input'
              name="input"
              autoComplete="off"
            />
          </form>
        </Col>
      </Grid>
    )
  }
}


const mapState = (state) => {
  return {
    messages: state.messages,
    user: state.me
  }
}


// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState)(Chat)