import { socket } from './socket';

export function changeChannel(channelName) {
  socket.emit('changeChannel', channelName);
}

export function enqueue(){
  socket.emit('enqueue');
}