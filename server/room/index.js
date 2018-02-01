module.exports = function(io){
  class RoomList{  
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
  const WAITING_FOR_QUEUE = 0;
  const LOADING_BROADCASTERS = 1;
  const USERS_DEBATING = 2;
  const WAITING_FOR_SCORING = 3;
  let roomId=-1;
  
  class Room {
    constructor(name) {
      RoomList[name] = this;
      this.name = name;
      this.viewers = [];
      this.broadcasters = [];
      this.queue  = [];
      this.id = ++roomId;
      this.roomActivity = null;
      this.currentAction = WAITING_FOR_QUEUE;
      this.tickRate = 0.5;
      this.gameLoop = this.gameLoop.bind(this);
      this.state = {};
      this.debateTime = 15;
      this.waitTime = 7;
    }
    gameLoop(){
      switch(this.currentAction){
        case WAITING_FOR_QUEUE:
          if(this.queue.length < 2)return;
          //Start the Broadcasts
          console.log(this.queue.length);
          this.startBroadcasting(this.queue.shift());
          console.log(this.queue.length);
          this.startBroadcasting(this.queue.shift());
          console.log(this.queue.length);
          this.state = {
            time: this.waitTime,
            broadcasterCount: 0,
            broadcasterIds: this.getBroadcasterIds(),
            status:'LOAD BROADCASTERS'
          }
          console.log('Waiting for broadcasters to be ready');
          this.sendRoomState();
          this.currentAction = LOADING_BROADCASTERS;
        
          case LOADING_BROADCASTERS:
            //Reset the room because the broadcasters timed out
            console.log(this.state.time, this.state.broadcasterCount);
            if( (this.state.time -= this.tickRate) <= 0){
                return this.reset(true);
            }
            if(this.state.broadcasterCount < 2)return; 
            //If we're ready to move on to the debate
            this.state = {
              time: this.debateTime,
              maxTime: this.debateTime,
              broadcasterIds: this.getBroadcasterIds(),
              mutedUser: this.getBroadcasterIds()[0],
              first:true,
              active:true,
              status:'DEBATE',
            }
            console.log('Broadcasters ready begining debate');
            this.sendRoomState();
            this.currentAction = USERS_DEBATING;
            break;
          
          case USERS_DEBATING:
            if( (this.state.time -= this.tickRate) <= 0){
              if(this.state.first){
                this.state.first = false;
                io.to(this.name).emit('switchMutedUser');
                this.state.time = this.state.maxTime;
                console.log('first user finished debating')
              }else{
                this.currentAction  = WAITING_FOR_SCORING;
                this.state = {
                  time: this.waitTime,
                  maxTime: this.waitTime,
                }
                console.log('second user finished debating waiting for scoring')
                this.sendRoomState();
              }
            }
            break;
          
          case WAITING_FOR_SCORING:
            if((this.state.time -= this.tickRate) <= 0){
              this.reset();
            }
      }
    }
    reset(wasCancelled){
      console.log(!wasCancelled?'reseting the room':'cancelling out the room');
      this.currentAction = WAITING_FOR_QUEUE;
      this.broadcasters = [];
      this.state = {};
      if(wasCancelled)io.to(this.name).emit('roomWasCancelled');
      else io.to(this.name).emit('roomHasEnded');
    }
    setRoomActivity(isActive){
      if(isActive){
        if(this.roomActivity) return;
        this.roomActivity = setInterval(this.gameLoop, this.tickRate * 1000);
      } else {
        if(!this.roomActivity) return;
        clearInterval(this.roomActivity);
        this.roomActivity = null;
      }
    }
    addViewer(viewer) {
      this.setRoomActivity(true);
      this.viewers.push(viewer);
      viewer.emit('setUserId', viewer.id);
    }
    removeViewer(viewer) {
      this.removeFromQueue(viewer);
      this.stopBroadcasting(viewer);
      if(this.viewers.indexOf(viewer)<0)return;
      if(!this.viewers.length) this.setRoomActivity(false);
      this.viewers.splice(this.viewers.indexOf(viewer),1);
    }
    startBroadcasting(broadcaster){
      this.broadcasters.push(broadcaster);
      broadcaster.emit('prepareToBroadcast');
      //io.to(this.name).emit('broadcasterStarted',broadcaster.id);
    }
    stopBroadcasting(broadcaster) {
      if(this.broadcasters.indexOf(broadcaster)<0)return;
      if(this.currentAction && this.currentAction < WAITING_FOR_SCORING)this.reset(true);
      this.broadcasters.splice(this.broadcasters.indexOf(broadcaster),1);
    }
    addToQueue(queuer){
      this.queue.push(queuer);
    }
    removeFromQueue(queuer) {
      if(this.queue.indexOf(queuer)<0)return;
      this.queue.splice(this.queue.indexOf(queuer),1);
    }
    getBroadcasterIds(){
      return this.broadcasters.map(broadcaster=>broadcaster.id);
    }
    sendRoomState(socket){  
      let state = Object.assign({},this.state,{sentTime:Date.now()});
      let broadcastTarget = socket ? socket : io.to(this.name)
      broadcastTarget.emit('setRoomState', state);
    }
  }
  return roomList;

}


