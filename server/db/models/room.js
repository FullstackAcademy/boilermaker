const RoomList = {};

RoomList.prototype = {
  createOrFindRoom(name) {
    let room = this[name];
    if(!room) room = new RoomList(name);
    return room;
  }
}

const Room = function (name) {
  this.name = name;
  RoomList[name] = this;
  this.viewes = [];
  this.broadcasters = [];
  this.queue  = [];
}

Room.prototype = {
  addViewer(viewer) {
    this.viewers.push(viewer);
  },
  removeViewer(viewer) {
    this.viewers.splice(this.viewers.indexOf(viewer),1);
  },
  addBroadcaster(broadcaster){
    this.broadcasters.push(broadcaster)
  },
  removeBroadcaster(broadcaster) {
    this.broadcasters.splice(this.broadcasters.indexOf(broadcaster),1);
  },
  addToQueue(queuer){
    this.queue.push(queuer);
    if(queue.length<2)queuer.emit('startBroadcasting');
  },
  removeFromQueue(queuer) {
    this.queue.splice(this.queue.indexOf(queuer),1);
  },
}

module.exports  = {Room, RoomList};