import { socket } from './socket';
import rtcConnection from '../rtcConnection';
import store from '../store/';

const formatChannelName = channelName => channelName.split(" ").join('');

export function changeChannel(channelName) {
  channelName = formatChannelName(channelName);
  socket.emit('changeChannel', channelName);
  socket.channel = channelName;
  //rtcConnection.join(channelName);
  rtcConnection.channel = channelName;
  //rtcConnection.join(channelName,()=>{console.log(rtcConnection.peers.getLength())});
  //rtcConnection.connect(channelName);
}

export function enqueue(){
  socket.emit('enqueue');
}

socket.on('userStartedBroadcasting',() => {
  let { currChannel } = store.getState();
  rtcConnection.session = {audio: true, video:true, broadcast:true,oneway:false};
  rtcConnection.open(formatChannelName(currChannel)+rtcConnection.userid);
});

socket.on('broadcasterStarted', broadcasterId => {
  let { currChannel} = store.getState();
  rtcConnection.session = Object.assign({},rtcConnection.session,{audio:true,video:true});
  rtcConnection.broadcasters.push(broadcasterId);
  rtcConnection.join(formatChannelName(currChannel)+broadcasterId);
});

socket.on('broadcasterFinished', broadcasterId => {
  let { currChannel } = store.getState();
  let i = rtcConnection.broadcasters.indexOf(broadcasterId);
  if(i>-1)rtcConnection.broadcasters.splice(i, 1);
  
  /*if(!rtcConnection.isStreaming){
    rtcConnection.session = {audio:true,video:true,oneway:true};
    if(!rtcConnection.broadcasters.length)rtcConnection.close();
  }*/
  //rtcConnection.close();
});

socket.on('setUserId', id => {
  rtcConnection.userid = id;
});

socket.on('setBroadcasters', broadcasterIds => {
  console.log('ids:',broadcasterIds)
  let { currChannel } = store.getState();
  rtcConnection.broadcasters = broadcasterIds;
  if(!broadcasterIds.length)return;
  rtcConnection.session = Object.assign({},rtcConnection.session,{audio:true,video:true,oneway:true});
  broadcasterIds.forEach(broadcasterId => {
    rtcConnection.join(formatChannelName(currChannel) + broadcasterId);
  })
})