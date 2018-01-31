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
      this.viewers.push(viewer);
      viewer.emit('setUserId',viewer.id);
      viewer.emit('setBroadcasters',this.getBroadcastersId());
    },
    removeViewer(viewer) {
      this.removeFromQueue(viewer);
      this.stopBroadcasting(viewer);
      if(this.viewers.indexOf(viewer)<0)return;
      console.log('removing viewer');
      this.viewers.splice(this.viewers.indexOf(viewer),1);
    },
    startBroadcasting(broadcaster){
      this.broadcasters.push(broadcaster);
      this.removeFromQueue(broadcaster);
      broadcaster.emit('userStartedBroadcasting');
      io.to(this.name).emit('broadcasterStarted',broadcaster.id);
    },
    stopBroadcasting(broadcaster) {
      if(this.broadcasters.indexOf(broadcaster)<0)return;
      console.log('stopping broadcast');
      io.to(this.name).emit('broadcasterFinished',broadcaster.id)
      this.broadcasters.splice(this.broadcasters.indexOf(broadcaster),1);
    },
    addToQueue(queuer){
      this.queue.push(queuer);
      if(this.queue.length<3 || 1){
        this.startBroadcasting(queuer);
      }
    },
    removeFromQueue(queuer) {
      if(this.queue.indexOf(queuer)<0)return;
      console.log('removed from queue');
      this.queue.splice(this.queue.indexOf(queuer),1);
    },
    getBroadcastersId(){
      return this.broadcasters.map(broadcaster=>broadcaster.id);
    }
  }
  return roomList;

}


