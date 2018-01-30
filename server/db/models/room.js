module.exports = function(io){
  const RoomList = function(){ };
  
  RoomList.prototype = {
    createOrFindRoom(name) {
      let room = this[name];
      if(!room) {
        room = new Room(name);
        this[name] = room;
      }
      return room;
    }
  }
  const roomList = new RoomList();
  
  let roomId=-1;
  
  const Room = function (name) {
    this.name = name;
    RoomList[name] = this;
    this.viewers = [];
    this.broadcasters = [];
    this.queue  = [];
    this.id = ++roomId;
  }
  
  Room.prototype = {
    addViewer(viewer) {
      viewer.emit('setUserId',viewer.id);
      viewer.emit('setBroadcasters',this.getBroadcastersId());
    },
    removeViewer(viewer) {
      if(this.viewers.indexOf(viewer)<0)return;
      this.viewers.splice(this.viewers.indexOf(viewer),1);
      this.removeFromQueue(viewer);
      this.stopBroadcasting(viewer);
    },
    startBroadcasting(broadcaster){
      this.broadcasters.push(broadcaster);
    },
    stopBroadcasting(broadcaster) {
      if(this.broadcasters.indexOf(broadcaster)<0)return;
      io.to(this.name).emit('broadcastFinished',broadcaster)
      this.broadcasters.splice(this.broadcasters.indexOf(broadcaster),1);
    },
    addToQueue(queuer){
      this.queue.push(queuer);
      if(this.queue.length<3 || 1){
        this.startBroadcasting(queuer);
        queuer.emit('userStartedBroadcasting');
        io.to(this.name).emit('broadcasterStarted',queuer.id);
      }
    },
    removeFromQueue(queuer) {
      if(this.queue.indexOf(queuer)<0)return;
      this.queue.splice(this.queue.indexOf(queuer),1);
    },
    getBroadcastersId(){
      return this.broadcasters.map(broadcaster=>broadcaster.id);
    }
  }
  return roomList;

}


