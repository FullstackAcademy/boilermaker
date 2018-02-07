import { socket } from './socket';
import rtcConnection from '../rtcConnection';
import store, { setTime, setTimerActive, setPhase, setDebate, setWinner, setVoting, setViewerCount, setMain, setBroadcasters } from '../store/';
import axios from 'axios';


const formatChannelName = channelName => channelName.split(" ").join('');

export function changeChannel(channelName) {
  channelName = formatChannelName(channelName);
  socket.emit('changeChannel', channelName);
  //socket.channel = channelName;
  rtcConnection.channel = channelName;
  //rtcConnection.openOrJoin(channelName);
  //rtcConnection.join(channelName,()=>{console.log(rtcConnection.peers.getLength())});
  //rtcConnection.connect(channelName);
}

/****************** Client interactions ******************/
export function enqueue() {
  socket.emit('enqueue');
}

export function chooseVote(idx) {
  socket.emit('chooseVote', idx); //sends corresponding broadcaster index i.e. [0 OR 1]
}

export function linkUserProfile(userId, userName) {
  socket.emit('linkUserProfile', userId, userName);
};

export function dequeue() {
  socket.emit('dequeue');
}

/****************** Client room ******************/

function offsetTimeByPing(roomState, sentTime) {
  let dTime = (Date.now() - sentTime);
  roomState.time += dTime;
  roomState.leadinTime += dTime;
  return roomState;
}

socket.on('prepareToBroadcast', () => {
  rtcConnection.userid = rtcConnection.USERID;
  rtcConnection.session = { audio: true, video: true, broadcast: true };
  rtcConnection.open(rtcConnection.USERID);
});

socket.on('setRoomState', roomState => {
  let timerIsActive = store.getState().room.timer.active;
  let { time, leadinTime, totalTime, totalLeadinTime } = roomState;
  rtcConnection.roomState = offsetTimeByPing(roomState, roomState.sentTime);

  if (!timerIsActive && roomState.active) store.dispatch(setTime(leadinTime, totalLeadinTime, time, totalTime));

  if (roomState.broadcasterIds) rtcConnection.joinBroadcasters(roomState.broadcasterIds);

  let { phaseStatus, viewerCount, queue, debateStatus, winner, muteUser } = roomState;
  //Set the users ability to vote
  store.dispatch(setVoting(roomState.canVote));

  store.dispatch(setMain(phaseStatus, viewerCount, queue));

  store.dispatch(setWinner(winner));

  store.dispatch(setDebate(debateStatus));

  muteUser && rtcConnection.muteUser(muteUser);

  unmuteUser && unmuteUser(unmuteUser);

  if (roomState.broadcasters) store.dispatch(setBroadcasters(roomState.broadcasters));

});

/*socket.on('unmute', id => {
  console.log('unmuting', id);
  var elem = rtcConnection.broadcastersObj[id];
  if (id !== rtcConnection.userid) elem.volume = 1;
  $(elem).parent().addClass('active');
});


socket.on('mute', id => {
  console.log('muting', id);
  var elem = rtcConnection.broadcastersObj[id];
  if (id !== rtcConnection.userid) elem.volume = 0;
  $(elem).parent().removeClass('active');
});*/

socket.on('setUserId', id => {
  //rtcConnection.changeUserId(id);
  rtcConnection.userid = id;
  rtcConnection.USERID = id;
  socket.emit('getRoomState');
});

socket.on('roomWasCancelled', () => {
  $('.empty-video').removeClass('active');
  rtcConnection.endStreams();
  store.dispatch(setTimerActive(false));
});

socket.on('roomHasEnded', () => {
  $('.empty-video').removeClass('active');
  rtcConnection.endStreams();
  store.dispatch(setTimerActive(false));
});


/* instead of socket.on setDebate we just get the relevant data from the roomstate
socket.on('setDebate', status => {
  store.dispatch(setDebate(status));
});

socket.on('setWinner', userName => {
  store.dispatch(setWinner(userName));
});

socket.on('setVoting', boolean => {
  store.dispatch(setVoting(boolean));
});
*/