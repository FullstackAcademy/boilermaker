import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import socket, { changeChannel } from '../socket';
import { setChannel } from '../store';

import { Button, Panel } from 'react-bootstrap';
import VideoFeed from './VideoFeed';
//import { newMessage } from '../store';

class Channel extends Component {

  constructor() {
    super();
    this.state = {
      connection: new RTCMultiConnection(),
    }
  }

  componentDidMount () {
    this.props.setChannel(this.props.match.params.channelName);
  }

  componentWillUpdate () {
    const { currChannel } = this.props;
    changeChannel(currChannel);
  }

  render() {
    const { currChannel } = this.props;
    return (
      <div>
        <h1>{ currChannel.name }</h1>
        <div>
          <VideoFeed connection={this.state.connection} channel={this.state.connection.channel} />
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  const currChannel = state.currChannel;
  return {
    currChannel
  }
}

const mapDispatch = (dispatch) => {
  return {
    setChannel (channelId) {
      dispatch(setChannel(channelId));
    }
  }
}


// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Channel));
