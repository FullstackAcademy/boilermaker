import { socket } from './socket';
import rtcConnection from '../rtcConnection';
import store, { setTime, setTimerActive, setDebate, setWinner, setVoting } from '../store/';
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

/****************** Client room ******************/

function offsetTimeByPing(roomState, sentTime) {
  let dTime = (Date.now() - sentTime) / 1000;
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
  //let leadinTime = 1000 * (roomState.status === 'LEAD IN' ? roomState.time : 0);
  //let currTime = 1000 * (roomState.status === 'LEAD IN' ? roomState.maxTime : roomState.time);
  //let currTime = roomState.time;
  //console.log(leadinTime,currTime,roomState.maxTime*1000);
  console.log(totalLeadinTime, roomState.status);
  if (!timerIsActive && roomState.active) store.dispatch(setTime(leadinTime, totalLeadinTime, time, totalTime));
  if (roomState.broadcasterIds) rtcConnection.joinBroadcasters(roomState.broadcasterIds);
  //rtcConnection.first = roomState.first;
  //setTimeout(()=>{rtcConnection.toggleMute(roomState.first);},2000);
});

socket.on('unmute', id => {
  console.log('unmuting',id);
  //rtcConnection.session = Object.assign({},rtcConnection.session,{audio:true});
  //rtcConnection.stream.toggle('mute-audio');
  /*console.warn('attempting to unumute...');
  if (rtcConnection.muted) {
    console.warn('UNMUTED!');
    rtcConnection.muted = !rtcConnection.muted;
    rtcConnection.stream.toggle('mute-audio');
  }*/
  var elem = rtcConnection.broadcastersObj[id];
  if (id !== rtcConnection.userid) elem.volume = 1;
  $(elem).parent().addClass('active');
});


socket.on('mute', id => {
  //rtcConnection.session = Object.assign({},rtcConnection.session,{audio:false});
  /*console.warn('attempting to mute...');
  if (!rtcConnection.muted) {
    console.warn('MUTED!');
    rtcConnection.muted = !rtcConnection.muted;
    rtcConnection.stream.toggle('mute-audio');
  }*/
  console.log('muting',id);
  var elem = rtcConnection.broadcastersObj[id];
  if (id !== rtcConnection.userid) elem.volume = 0;
  $(elem).parent().removeClass('active');
});

/*socket.on('switchMutedUser', () => {
  //rtcConnection.broadcasters.forEach(broadcasterId => rtcConnection.toggleMute(broadcasterId));
  rtcConnection.toggleMute(false);
  0 && store.dispatch(setTimer( rtcConnection.roomState.time = rtcConnection.roomState.maxTime));
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

socket.on('setDebate', status => {
  store.dispatch(setDebate(status));
});

socket.on('setWinner', userName => {
  store.dispatch(setWinner(userName));
});

socket.on('setVoting', boolean => {
  store.dispatch(setVoting(boolean));
});

/*socket.on('broadcasterStarted', broadcasterId => {
  let { currChannel} = store.getState();
  rtcConnection.session = Object.assign({},rtcConnection.session,{audio:true,video:true});
  rtcConnection.broadcasters.push(broadcasterId);
  rtcConnection.join(formatChannelName(currChannel)+broadcasterId);
});*/

/*socket.on('broadcasterFinished', broadcasterId => {
  let { currChannel } = store.getState();
  let i = rtcConnection.broadcasters.indexOf(broadcasterId);
  if(i>-1)rtcConnection.broadcasters.splice(i, 1);
  
  /*if(!rtcConnection.isStreaming){
    rtcConnection.session = {audio:true,video:true,oneway:true};
    if(!rtcConnection.broadcasters.length)rtcConnection.close();
  }
  //rtcConnection.close();
});
*/


/*socket.on('setBroadcasters', broadcasterIds => {
  console.log('ids:',broadcasterIds)
  let { currChannel } = store.getState();
  rtcConnection.broadcasters = broadcasterIds;
  if(!broadcasterIds.length)return;
  rtcConnection.session = Object.assign({},rtcConnection.session,{audio:true,video:true,oneway:true});
  broadcasterIds.forEach(broadcasterId => {
    rtcConnection.join(formatChannelName(currChannel) + broadcasterId);
  });
})*/