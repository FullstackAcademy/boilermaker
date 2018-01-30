import { socket } from './socket';
import rtcConnection from '../store/rtcConnection';
import store, {setRtcConnection} from '../store/';

export function changeChannel(channelName) {
  channelName = channelName.split(" ").join('');
  socket.emit('changeChannel', channelName);
  socket.channel = channelName;
  rtcConnection.channel = channelName;
  //rtcConnection.join(channelName,()=>{console.log(rtcConnection.peers.getLength())});
  rtcConnection.connect(channelName);
  rtcConnection.join(channelName);
}

export function enqueue(){
  socket.emit('enqueue');
}

socket.on('userStartedBroadcasting',()=>{
  console.log('startingBroadcast!');
  let { currChannel} = store.getState();
  rtcConnection.session = {audio: true, video:true, broadcast:true};
  rtcConnection.openOrJoin(currChannel);
});

socket.on('broadcasterStarted',broadcastId =>{
  rtcConnection.join(broadcastId);
});

socket.on('setUserId',id=>{
  rtcConnection.userid = id;
  console.log('setting user id to',id)
});

/*

Auto does this for us....


socket.on('setBroadcasters',broadcasterIds=>{
  console.log('attempting to sync with broadcasters',broadcasterIds);
  if(!broadcasterIds.length)return;
  broadcasterIds.forEach(broadcastId =>{
    rtcConnection.connect(broadcastId,()=>{console.log('joined',broadcastId)});
    rtcConnection.peers[broadcastId].addStream({video:true,audio:true,oneway:true});
  })
})
*/