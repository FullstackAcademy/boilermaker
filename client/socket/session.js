import { socket } from './socket';
import rtcConnection from '../rtcConnection';
import store, { setTimer } from '../store/';

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

export function enqueue(){
  socket.emit('enqueue');
}

function offsetTimeByPing(roomState,sentTime){
  return roomState;
}

socket.on('prepareToBroadcast',() => {
  rtcConnection.userid = rtcConnection.USERID;
  rtcConnection.session = {audio: true, video:true, broadcast:true};
  rtcConnection.open(rtcConnection.USERID);
});

socket.on('setRoomState', roomState => {
  rtcConnection.roomState = offsetTimeByPing(roomState, roomState.sentTime);
  if(roomState.time && roomState.active) 0 && store.dispatch(setTimer(roomState.time));
  if(roomState.broadcasterIds && roomState.status === 'DEBATE') rtcConnection.joinBroadcasters(roomState.broadcasterIds, () => {
    alert(1);
    rtcConnection.toggleMute(roomState.first);
  });
});

socket.on('switchMutedUser', () => {
  rtcConnection.broadcasters.forEach(broadcasterId => rtcConnection.toggleMute(broadcasterId));
  0 && store.dispatch(setTimer( rtcConnection.roomState.time = rtcConnection.roomState.maxTime));
});

socket.on('setUserId', id => {
  //rtcConnection.changeUserId(id);
  rtcConnection.userid = id;
  rtcConnection.USERID = id;
  socket.emit('getRoomState');
});

socket.on('roomWasCancelled',()=>{rtcConnection.endStreams()});

socket.on('roomHasEnded',()=>{rtcConnection.endStreams()});

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