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
    this.changeVote1 = this.changeVote1.bind(this);
    this.changeVote2 = this.changeVote2.bind(this);
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
    const { user, isLoggedIn, currentChannel, timerIsActive, room, status } = this.props;

    return (
      <div>
        {
          isLoggedIn && linkUserProfile(user.id, user.userName)
        }
        <div className='channel-container'>

          {/*<VideoFeed connection={rtcConnection} channel={currChannel} />*/}

          <div className='main-channel-container'>
            <div className="main-channel-child">
              {
                this.state.togglePrompt && <Prompts displayPrompt={this.displayPrompt} display={this.state.togglePrompt} />
              }
              <Announcements status={status} />
              <h1 className="animated slideInLeft center-text">{currentChannel}</h1>
              <div className='videos-container'>
                <div className="video-feeds">
                  <div className="video-rooms-container">
                    <div id="video-room-1">
                      <div id='empty-video-1' className='empty-video'></div>
                      <Voting vote={this.changeVote1} elementId={'1'} />
                    </div>
                    <Timer />
                    <div id="video-room-2">
                      <div id='empty-video-2' className='empty-video'></div>
                      <Voting vote={this.changeVote2} elementId={'2'} />
                    </div>
                  </div>
                </div>
                <Button onClick={()=> {
                  this.props.setTime(0, 100000, 0, 100000)
                }}>
                TEST TIMER
                </Button>
                <Button className="queue-up" onClick={enqueue}>Join the Queue</Button>
                <Button className="open-button" bsSize={"large"} onClick={this.displayPrompt}>Prompts</Button>
                <Reaction />
                <ReactionButtons />
              </div>
            </div>
            <Chat channel={currentChannel} />
          </div>
        </div>
      </div>
    )
  }
}
// <div className='button-group-wrapper'>
//   <div className='button-group'>
//     <button onClick={() => { this.props.setTime(0, 5, 0, 30) }}>Test Timer</button>
//   </div>
// </div>

const mapState = (state, ownProps) => {
  const currentChannel = ownProps.match.params.channelName;
  return {
    user: state.me,
    isLoggedIn: !!state.me.id,
    currentChannel,
    timerIsActive: state.room.timer.active,
    room: state.room,
    status: state.room.status
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
