import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeChannel, enqueue } from '../socket';
import { Button, Panel } from 'react-bootstrap';

import { setMessages, setRtcConnection } from '../store';
import rtcConnection from '../store/rtcConnection';
import Timer from './Timer';
import VideoFeed from './VideoFeed';
import Chat from './chat';

class Channel extends Component {
  componentDidMount() {
    let channelName = this.props.currentChannel;
    this.props.setMessages(['- Joining ' + channelName + ' -']);
    changeChannel(channelName);
    //rtcConnection.connect(channelName);
  }

  render() {
    const { currentChannel, rtcConnection } = this.props;
    return (
      <div>
        <div id='videos-container'></div>
        <h1>{currentChannel}</h1>
        <Timer />
        <Chat />
        <div>
          {/*<VideoFeed connection={rtcConnection} channel={currChannel} />*/}
          <Button onClick={enqueue}>Add Yourself To Queue</Button>
        </div>
      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  const currentChannel = ownProps.match.params.channelName;
  return {
    currentChannel
  }
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    setMessages(messages) {
      dispatch(setMessages(messages));
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Channel));