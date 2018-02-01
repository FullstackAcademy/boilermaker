import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import { setMessages, setTime } from '../store';
import { changeChannel, enqueue } from '../socket';

import Chat from './Chat';
import VideoFeed from './VideoFeed';
import Timer from './Timer';
import Voting from './Voting';
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
    let channelName = this.props.match.params.channelName;
    this.props.setMessages([]);
    changeChannel(channelName);
  }

  displayPrompt() {
    this.state.togglePrompt ? this.setState({ togglePrompt: false }) : this.setState({ togglePrompt: true });
  }

  changeVote1() {
    document.getElementById('vote-1').classList.toggle('active');
    document.getElementById('vote-2').classList.remove('active');
  }
  changeVote2() {
    document.getElementById('vote-2').classList.toggle('active');
    document.getElementById('vote-1').classList.remove('active');
  }

  render() {
    const { currentChannel, timerIsActive } = this.props;
    return (
      <div>
        <div id='videos-container'></div>
        <h1>{currentChannel}</h1>
        { <Timer/>}
        <Chat channel={currentChannel} />
        <div>
          {/*<VideoFeed connection={rtcConnection} channel={currChannel} />*/}
          <Button onClick={enqueue}>Add Yourself To Queue</Button>
        </div>
        {
          this.state.togglePrompt && <Prompts displayPrompt={this.displayPrompt} />
        }
        <div>
          <Button className="open-button" bsSize={"large"} onClick={this.displayPrompt}>
            +
          </Button>
          <button onClick={()=>{this.props.setTime(0,2,0,2)}}> -ga</button>
        </div>
        <Voting changeVote1={this.changeVote1} changeVote2={this.changeVote2} />
      </div >
    )
  }
}

const mapState = (state, ownProps) => {
  const currentChannel = ownProps.match.params.channelName;
  return {
    currentChannel,
    timerIsActive: state.timer.active
  }
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    setMessages(messages) {
      dispatch(setMessages(messages));
    },
    setTime(){
      dispatch(setTime(...arguments))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Channel));
