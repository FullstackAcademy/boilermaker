import { socket } from './socket';
import rtcConnection from '../store/rtcConnection';
import store, {setRtcConnection} from '../store/';

export function changeChannel(channelName) {
  channelName = channelName.split(" ").join('');
  console.log(channelName)
  socket.emit('changeChannel', channelName);
  rtcConnection.channel = channelName;
  rtcConnection.openOrJoin(channelName,()=>{console.log(rtcConnection.peers.getLength())});
}

export function enqueue(){
  socket.emit('enqueue');
}

socket.on('startBroadcasting',()=>{
  let { currChannel} = store.getState();
  rtcConnection.session = {audio: true, video:true, broadcast:true,oneway:false};
  rtcConnection.openOrJoin(currChannel);
  rtcConnection.addStream(rtcConnection.session);
});

socket.on('setUserId',id=>{
  rtcConnection.userid = id;
});

socket.on('setBroadcasters',broadcasters=>{
  console.log('attempting to sync with broadcasters',broadcasters);
  if(!broadcasters.length)return;
  broadcasters.forEach(broadcastId =>{
    rtcConnection.connect(broadcastId,()=>{console.log('joined',broadcastId)});
    console.log('111');
  })
})