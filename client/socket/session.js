import { socket } from './socket';
import rtcConnection from '../rtcConnection';
import store, { setTime } from '../store/';

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
  roomState.time = Date.now() - sentTime;
  return roomState;
}

socket.on('prepareToBroadcast',() => {
  rtcConnection.userid = rtcConnection.USERID;
  rtcConnection.session = {audio: false, video:true, broadcast:true};
  rtcConnection.open(rtcConnection.USERID);
});

socket.on('setRoomState', roomState => {
  rtcConnection.roomState = offsetTimeByPing(roomState, roomState.sentTime);
  if(roomState.time && roomState.active) store.dispatch(setTime(roomState.time,roomState.maxTime*1000));
  if(roomState.broadcasterIds && roomState.status === 'DEBATE') rtcConnection.joinBroadcasters(roomState.broadcasterIds);
  //rtcConnection.first = roomState.first;
  //setTimeout(()=>{rtcConnection.toggleMute(roomState.first);},2000);
});

socket.on('unmute',()=>{
  //rtcConnection.attachStreams[0].unmute('audio');
  rtcConnection.session = Object.assign(rtcConnection.session,{audio:true});
});


socket.on('mute',()=>{
  rtcConnection.session = Object.assign(rtcConnection.session,{audio:false});
  //rtcConnection.attachStreams[0].mute('audio');
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