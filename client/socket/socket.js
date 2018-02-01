import io from 'socket.io-client';
import store, { newMessage } from '../store/';

const socket = io('/',{reconnection: false});

socket.on('connect', () => {
  console.log('Connected!')
  socket.on('message', message => {
    console.log('message sent')
    store.dispatch(newMessage(message));
  });
})

export { socket, io };
