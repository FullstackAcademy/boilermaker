let roomList;
module.exports = (io, socket) => {
  const  rl = roomList; 
  if(!rl){
    roomList =require('../room')(io);
  }
  console.log(`A socket connection to the server has been made: ${socket.id}`);

  socket.on('disconnect', () => {
    if(socket.room)socket.room.removeViewer(socket);
    console.log(`Connection ${socket.id} has left the building`);
  });
  
  socket.on('changeChannel', roomName => {
    socket.join(roomName);
    let room = roomList.createOrFindRoom(roomName);
    room.addViewer(socket);
    socket.room = room;
    console.log('chainging room to',roomName,room.id);
  });
  
  socket.on('enqueue', ()=>{
    socket.room.addToQueue(socket);
  });
  socket.on('message', messageObj => {
    let room = io;
    let { username, message } = messageObj;
    if (!username) username = 'Anonymous';
    if (socket.room.name) room = io.to(socket.room.name);
    room.emit('message', `[${new Date().toLocaleTimeString('en-US')}] ${username}: ${message}`)
  });
  socket.on('readyToBroadcast', () => {
    if('broadcasterCount' in socket.room.state)socket.room.state.broadcasterCount++;
  });
  socket.on('getRoomState', () => {
    socket.room.sendRoomState(socket);
  });
}