module.exports = (io, socket) => {
  let currentRoom = '';
  console.log(`A socket connection to the server has been made: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`Connection ${socket.id} has left the building`);
  });
  socket.on('changeChannel', roomName => {
    currentRoom = roomName;
    socket.join(currentRoom);
  });
  socket.on('message', message => {
    let room = io;
    if (currentRoom) room = io.to(currentRoom);
    room.emit('message', `[${new Date().toLocaleTimeString('en-US')}][ Username ] Says : ${message}`)
  });
}