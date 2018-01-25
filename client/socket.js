import io from 'socket.io-client';
import { newMessage } from './store/';

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
  socket.on('message',message => {
    newMessage(message);
  });
})

export default socket
