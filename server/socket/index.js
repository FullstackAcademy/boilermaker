const  {RoomList} = require('../db/models/room');
module.exports = (io, socket) => {
  console.log(`A socket connection to the server has been made: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`Connection ${socket.id} has left the building`);
  });
  
  socket.on('changeChannel', roomName => {
    socket.join(currentRoom);
    let room = RoomList.createOrFindRoom(roomName);
    room.addViewer(socket);
    socket.room = room;
  });
  
  socket.on('enqueue'){
    socket.room.addToQueue(this);
  }
  socket.on('message', message => {
    let room = io;
    if (socket.room.name) room = io.to(socket.room.name);
    room.emit('message', `[${new Date().toLocaleTimeString('en-US')}][ Username ] Says : ${message}`)
  });
}