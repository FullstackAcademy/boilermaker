import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import socket, { changeChannel } from '../socket';
import { setChannel, setMessages } from '../store';
import { Button, Panel } from 'react-bootstrap';
import VideoFeed from './VideoFeed';
//import { newMessage } from '../store';

class Channel extends Component {

  constructor() {
    super();

  componentDidMount () {
    let {RtcConnection} = this.props;
    let channelName = this.props.match.params.channelName;
    this.props.setChannel(channelName);
    this.props.setMessages(['- Joining ' + channelName + ' -']);
    RtcConnection.session = { audio:false, video:false };
    RtcConnection.open(channelName);
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
          <Button onClick={()=>Enqueue()}>Add Yourself To Queue</Button>
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  const {currChannel, rtcConnection} = state;
  return {
    currChannel,
    rtcConnection,
  }
};

const mapDispatch = (dispatch) => {
  return {
    setChannel (channelId) {
      dispatch(setChannel(channelId));
    },
    setMessages(messages){
      dispatch(setMessages(messages));
    }
  }
}


// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Channel));
