import { socket } from './socket';
import store from '../store/';

export function changeChannel(channelName) {
  socket.emit('changeChannel', channelName);
}

export function enqueue(){
  socket.emit('enqueue');
}

socket.on('startBroadcasting',()=>{
  let {rtcConnection, currChannel} = store.getState();
  rtcConnection.session = {audio: true, video:true, broadcasting:true};
  rtcConnection.open(currChannel);  
});