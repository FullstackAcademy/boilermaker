import io from 'socket.io-client';
import store, { newMessage } from './store/';

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
  socket.on('message',message => {
    store.dispatch(newMessage(message));
  });
})

export default socket
