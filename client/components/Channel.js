import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Chat from './chat';
import { changeChannel, enqueue } from '../socket';
import { setChannel, setMessages, setRtcConnection } from '../store';
import { Button, Panel } from 'react-bootstrap';
import VideoFeed from './VideoFeed';
import Timer from './Timer';
import rtcConnection from '../store/rtcConnection';
//import { newMessage } from '../store';

class Channel extends Component {
  componentDidMount() {
    let channelName = this.props.match.params.channelName;
    this.props.setMessages(['- Joining ' + channelName + ' -']);
    this.props.setChannel(channelName);
    changeChannel(channelName);
    //rtcConnection.connect(channelName);
  }

  render() {
    const { currChannel, rtcConnection } = this.props;
    return (
      <div>
        <div id='videos-container'></div>
        <h1>{currChannel.name}</h1>
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
let refresh = false;
const mapState = (state) => {
  const { currChannel } = state;
  return {
    currChannel,
    refresh: refresh,
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

export const refreshMe = function () { refresh != refresh }
