import React, { Component } from 'react';
import { connect } from 'react-redux';
import { socket } from '../../socket';
import { Button, Panel, Grid, Row, Col } from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.sendMessage = this.sendMessage.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.shift = false;
  }

  componentDidUpdate() {
    let chat = document.getElementById('chat-body');
    chat.scrollTop = chat.scrollHeight;
  }
  onKeyUp(e) {
    if (e.key === 'Shift') this.shift = false;
  }
  onKeyDown(e) {
    if (e.key === 'Shift') this.shift = true;
    if (!this.shift && e.key === 'Enter') {
      e.preventDefault();
      this.sendMessage(e);
    }
  }

  sendMessage(evt) {
    evt.preventDefault();
    let message = evt.target.value;
    let username = this.props.user.userName;
    let messageObj = { message, username }
    socket.emit('message', messageObj);
    evt.target.value = '';
  }

  render() {
    const { messages, channel } = this.props;
    let name = '';

    // channel.length > 21 ? name = channel.slice(0, 22) + '...' : name = channel

    return (
      <ReactCSSTransitionGroup
        transitionName="transition"
        transitionAppear={true}
        transitionAppearTimeout={1000}
        transitionEnter={false}
        transitionLeave={false}>
        <div id='main-chat-room' className="chat">
          <div id="chat-room-header">Chat</div>
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
                <div key={`chat-message-${i}`} className={`chat-message ${color}`}>
                  <span className="message-author">{name}</span>
                  <span className='chat-message-text'>{text}</span>
                  <span className="message-date">{date}</span>
                </div>
              )
            })}
          </div>
          <form xs={4} md={3} id="send-message" onKeyDown={this.onKeyDown} onKeyUp={this.onKeyUp} onSubmit={this.sendMessage}>
            <textarea
              id='chat-input'
              name="input"
              autoComplete="off"
              placeholder="Send a message"
            />
          </form>
        </div>
      </ReactCSSTransitionGroup>
    )
  }
}

const mapState = (state) => {
  return {
    messages: state.room.messages,
    user: state.me
  }
}

export default connect(mapState)(Chat)
