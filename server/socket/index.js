const { User } = require('../db/models');
module.exports = (io,socket,Room) => {

  console.log(`A socket connection to the server has been made: ${socket.id}`);

  socket.on('linkUserProfile', (userId, userName) => {
    socket.userId = userId;
    socket.userName = userName;
  })

  socket.on('disconnect', () => {
    if (socket.room) {
      socket.room.removeViewer(socket);
      socket.room.sendRoomState();
      socket.vote = { choice: 2, castedVote: false };
    }
    console.log(`Connection ${socket.id} has left the building`);
  });

  socket.on('changeChannel', roomName => {
    socket.join(roomName);
    let room = Room.createOrFindRoom(roomName);
    room.addViewer(socket);
    socket.room = room;
    socket.vote = { choice: 2, castedVote: false };
    console.log('changing room to', roomName, room.id);
  });

  socket.on('enqueue', () => {
    socket.room.addToQueue(socket);
    socket.room.sendRoomState();
  });

  socket.on('dequeue', () => {
    socket.room.removeFromQueue(socket);
    socket.room.sendRoomState();
  });

  socket.on('chooseVote', idx => {
    if (socket.vote.choice !== idx) {
      socket.room.voteTally[idx]++;
      socket.vote.choice = idx;
      if (socket.vote.castedVote === true) {
        if (idx) socket.room.voteTally[idx - 1]--;
        else socket.room.voteTally[idx + 1]--;
      }
      socket.vote.castedVote = true;
    } else {
      socket.room.voteTally[idx]--;
      socket.vote.choice = 2;
      socket.vote.castedVote = false;
    }
  });

  socket.on('message', messageObj => {
    let room = io;
    let { username, message } = messageObj;
    if (!username) username = 'Anonymous';
    if (socket.room.name) room = io.to(socket.room.name);
    room.emit('message', `[${new Date().toLocaleTimeString('en-US')}] ${username}: ${message}`)
  });
  socket.on('reaction', reactionId => {
    let room = io;
    if (socket.room.name) room = io.to(socket.room.name);
    room.emit('reaction', reactionId)
  })
  socket.on('readyToBroadcast', () => {
    if ('broadcasterCount' in socket.room.state && ++socket.room.state.broadcasterCount > 1){
      socket.room.startDebating()
    }
  });

  socket.on('getRoomState', () => {
    socket.room.sendRoomState();
  });
}