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
  const LEAD_IN = -1;
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
      this.debateLength = 10;
      this.broadcasterTimeout = 5;
      this.leadinTime = 5;
      this.votingTime = 5;
    }
    gameLoop(){
      switch(this.currentAction){
        case LEAD_IN:
          if((this.state.leadinTime -= this.tickRate) <= 0)this.leadinCallback();
        case WAITING_FOR_QUEUE:
          if(this.queue.length < 2)return;
          //Start the Broadcasts
          this.startBroadcasting(this.queue.shift());
          this.startBroadcasting(this.queue.shift());
          this.state = {
            time: this.broadcasterTimeout,
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
            this.leadin(() => {
              //If we're ready to move on to the debate
              this.state = {
                time: this.debateLength,
                totalTime: this.debateLength,
                leadinTime: 0,
                totalLeadinTime: this.leadinTime,
                broadcasterIds: this.getBroadcasterIds(),
                active:true,
                status:'DEBATE',
              }
              this.sendRoomState();
              this.broadcasters[0].emit('unmute');
              this.currentAction = USERS_DEBATING;
              console.log('first user being debating');
            });
            break;
          
          case USERS_DEBATING:
            if( (this.state.time -= this.tickRate) <= 0){
              if(this.state.first){
                this.leadin(()=>{
                  this.state.first = false;
                  this.broadcasters[0].emit('mute');
                  this.broadcasters[1].emit('unmute');
                  this.state.time = this.state.totalTime;
                  console.log('second user begin debating')
                });
              }else{
                this.currentAction  = WAITING_FOR_SCORING;
                this.state = {
                  time: this.votingTime,
                  totalTime: this.votingTime,
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
    leadin(f){
      console.log('waiting between activities');
      this.leadinCallback = f;
      this.state = {
        active:true,
        totalTime:this.debateLength,
        time:this.debateLength,
        leadinTime: this.leadinTime,
        totalLeadinTime: this.leadinTIme,
        broadcasterIds: this.getBroadcasterIds(),
        first:true,
        status:'LEAD IN',
      }
      this.sendRoomState();
      this.currentAction = LEAD_IN;
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
      let broadcastTarget = socket ? socket : io.to(this.name);
      broadcastTarget.emit('setRoomState', state);
    }
  }
  return roomList;
}