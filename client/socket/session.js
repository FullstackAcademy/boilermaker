import { socket } from './socket';

export function changeChannel(channelName) {
  socket.emit('changeChannel', channelName);
}
