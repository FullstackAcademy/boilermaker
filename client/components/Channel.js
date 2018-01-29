import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import socket, { changeChannel } from '../socket';
import { setChannel, setMessages } from '../store';
import { Button, Panel } from 'react-bootstrap';
import VideoFeed from './VideoFeed';
//import { newMessage } from '../store';

class Channel extends Component {

  componentDidMount() {
    let { rtcConnection } = this.props;
    let channelName = this.props.match.params.channelName;
    this.props.setChannel(channelName);
    this.props.setMessages(['- Joining ' + channelName + ' -']);
    if(!rtcConnection)return;
    rtcConnection.session = { audio: false, video: false };
    rtcConnection.open(channelName);
  }

  componentWillUpdate() {
    const { currChannel } = this.props;
    changeChannel(currChannel);
  }

  render() {
    const { currChannel, rtcConnection } = this.props;
    return (
      <div>
        <h1>{currChannel.name}</h1>
        <div>
          <VideoFeed connection={rtcConnection} channel={rtcConnection.channel} />
          <Button onClick={() => socket.emit('enqueue')}>Add Yourself To Queue</Button>
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  const { currChannel, rtcConnection } = state;
  return {
    currChannel,
    rtcConnection,
  }
};

const mapDispatch = (dispatch) => {
  return {
    setChannel(channelId) {
      dispatch(setChannel(channelId));
    },
    setMessages(messages) {
      dispatch(setMessages(messages));
    }
  }
}


// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Channel));
