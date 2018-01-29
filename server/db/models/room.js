
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
    viewer.emit('setBroadcasters',this.getBroadcastersIdArray());
  },
  removeViewer(viewer) {
    this.viewers.splice(this.viewers.indexOf(viewer),1);
  },
  addBroadcaster(broadcaster){
    this.broadcasters.push(broadcaster)
    console.log('added broadcaster',this.getBroadcastersIdArray().join(','));
  },
  removeBroadcaster(broadcaster) {
    this.broadcasters.splice(this.broadcasters.indexOf(broadcaster),1);
  },
  addToQueue(queuer){
    this.queue.push(queuer);
    if(this.queue.length<3){
      this.addBroadcaster(queuer);
      queuer.emit('startBroadcasting');
    }
  },
  removeFromQueue(queuer) {
    this.queue.splice(this.queue.indexOf(queuer),1);
  },
  getBroadcastersIdArray(){
    return this.broadcasters.map(broadcaster=>broadcaster.id);
  }
}

module.exports  = {roomList};