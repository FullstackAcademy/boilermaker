import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Panel } from 'react-bootstrap';

import rtcConnection from '../store/rtcConnection';
import { setMessages } from '../store';
import { changeChannel, enqueue } from '../socket';

import Chat from './chat';
import VideoFeed from './VideoFeed';
import Timer from './Timer';

class Channel extends Component {
  componentDidMount() {
    let channelName = this.props.match.params.channelName;
    this.props.setChannel(channelName);
    changeChannel(channelName);
  }

  render() {
    const { currentChannel, rtcConnection } = this.props;
    return (
      <div>
        <div id='videos-container'></div>
        <h1>{currentChannel}</h1>
        <Timer />
        <Chat channel={currChannel.name} />
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
