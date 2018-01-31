import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Panel } from 'react-bootstrap';

import rtcConnection from '../rtcConnection';
import { setMessages } from '../store';
import { changeChannel, enqueue } from '../socket';

import Chat from './chat';
import VideoFeed from './VideoFeed';
import Timer from './Timer';
import Prompts from './Prompts';

class Channel extends Component {
  constructor() {
    super()
    this.state = {
      togglePrompt: false
    }
    this.displayPrompt = this.displayPrompt.bind(this);
  }

  componentDidMount() {
    let channelName = this.props.currentChannel;
    this.props.setMessages(['- Joining ' + channelName + ' -']);
    changeChannel(channelName);
  }

  displayPrompt() {
    this.state.togglePrompt ? this.setState({ togglePrompt: false }) : this.setState({ togglePrompt: true });
  }

  render() {
    const { currentChannel } = this.props;
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
        {
          this.state.togglePrompt && <Prompts displayPrompt={this.displayPrompt} />
        }
        <Button className="open-button" bsSize={"large"} onClick={this.displayPrompt}>
          +
        </Button>
      </div >
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
