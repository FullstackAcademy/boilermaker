import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import { setMessages, setTime } from '../../store';
import { changeChannel, enqueue, chooseVote, linkUserProfile } from '../../socket';

import Chat from './Chat';
import VideoFeed from './VideoFeed';
import Timer from './Timer';
import Voting from './Voting';
import Prompts from './Prompts';
import Announcements from './Announcements';
import Reaction from './Reaction';
import ReactionButtons from './ReactionButtons';

class Channel extends Component {
  constructor() {
    super()
    this.state = {
      togglePrompt: false,
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
    chooseVote(0);
  }
  changeVote2() {
    document.getElementById('vote-2').classList.toggle('active');
    document.getElementById('vote-1').classList.remove('active');
    chooseVote(1);
  }

  render() {
    const { user, isLoggedIn, currentChannel, timerIsActive } = this.props;
    return (
      <div>
        <Announcements />
        {
          isLoggedIn && linkUserProfile(user.id, user.userName)
        }
        {
          this.state.togglePrompt && <Prompts displayPrompt={this.displayPrompt} />
        }
        <Chat channel={currentChannel} />
        <div className='channel-container'>
          <h1 className="animated slideInLeft">{currentChannel}</h1>

          {/*<VideoFeed connection={rtcConnection} channel={currChannel} />*/}

          <div className='main-channel-container'>
            <div className='videos-container'>
              <div id='empty-video-1' className='empty-video' />
              <Timer />
              <div id='empty-video-2' className='empty-video' />
            </div>
            <div className='button-group-wrapper'>
              <div className='button-group'>
                <Button onClick={enqueue}>Add Yourself To Queue</Button>
                <Button className="open-button" bsSize={"large"} onClick={this.displayPrompt}>Prompts</Button>
                <button onClick={() => { this.props.setTime(0, 5, 0, 30) }}>Test Timer</button>
                <Voting changeVote1={this.changeVote1} changeVote2={this.changeVote2} />
              </div>
            </div>
          </div>
        </div>
      </div >
    )
  }
}

const mapState = (state, ownProps) => {
  const currentChannel = ownProps.match.params.channelName;
  return {
    user: state.me,
    isLoggedIn: !!state.me.id,
    currentChannel,
    timerIsActive: state.room.timer.active
  }
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    setMessages(messages) {
      dispatch(setMessages(messages));
    },
    setTime() {
      dispatch(setTime(...arguments))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Channel));
