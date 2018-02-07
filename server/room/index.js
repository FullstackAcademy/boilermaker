const { User } = require('../db/models');

module.exports = (io) => {
  const rooms = {};
  const LEAD_IN = -1;
  const WAITING_FOR_QUEUE = 0;
  const LOADING_BROADCASTERS = 1;
  const USERS_DEBATING = 2;
  const RESETTING_GAME = 3;
  let roomId = -1;
  const points = 25;

  class Room {
    constructor(name) {
      this.name = name;
      this.viewers = [];
      this.broadcasters = [];
      this.queue = [];
      this.voteTally = [0, 0];
      this.id = ++roomId;
      this.state = {};
      this.debateLength = 10000;
      this.broadcasterTimeout = 5000;
      this.leadinTime = 5000;
      this.votingTime = 5000;
      this.action = { status: WAITING_FOR_QUEUE };
      this.firstDebator = true;
      rooms[name] = this;
    }
    startLoadingBroadcasters() {
      this.startBroadcasting(this.queue.shift());
      this.startBroadcasting(this.queue.shift());
      this.state = {
        broadcasterCount: 0,
        broadcasterIds: this.getBroadcasterIds(),
      }
      console.log('Waiting for broadcasters to be ready');
      this.action.status = LOADING_BROADCASTERS;
      this.action.timestamp = Date.now();
      this.sendRoomState();
      this.action.timeout = setTimeout(() => {
        if (this.action.status === LOADING_BROADCASTERS) this.reset(true);
      }, this.broadcasterTimeout);
    }

    startDebating(firstDebator = true) {
      clearTimeout(this.action.timeout);
      this.leadin(() => {
        //If we're ready to move on to the debate
        console.log(firstDebator ? 'first' : 'second', 'user begins debating');
        this.state = {
          broadcasterIds: this.getBroadcasterIds(),
          active: true,
          firstDebator,
        }
        this.action.timeout = setTimeout(() => {
          if (this.action.status === USERS_DEBATING) {
            if (firstDebator) {
              this.firstDebator = false;
              this.leadin(() => this.startDebating(false))
            }
            else this.finishGame();
          }
        }, this.debateLength);

        /*let action = ['unmute', 'mute'];
        if (!firstDebator) action = ['mute', 'unmute'];

        io.to(this.name).emit(action[0], this.broadcasters[0].id);
        io.to(this.name).emit(action[1], this.broadcasters[1].id);*/

        this.action.status = USERS_DEBATING;
        this.action.timestamp = Date.now();
        io.to(this.name).emit('unmute', this.broadcasters[0].id);
        this.sendRoomState();
      });
    }

    finishGame() {
      clearTimeout(this.action.timeout);
      let userName = this.calculateWinner();
      this.action.status = RESETTING_GAME;
      this.action.timestamp = Date.now();
      this.state = { winner: userName };
      this.sendRoomState();
      this.action.timeout = setTimeout(() => {
        this.reset();
      }, this.votingTime);
    }
    leadin(f) {
      console.log('waiting between activities');
      this.action.timeout = setTimeout(() => { if (this.action.status === LEAD_IN) f() }, this.leadinTime);
      this.leadinCallback = f;
      this.state = {
        active: true,
        broadcasterIds: this.getBroadcasterIds(),
      }
      this.action.status = LEAD_IN;
      this.action.timestamp = Date.now();
      this.sendRoomState();
    }
    reset(wasCancelled) {
      console.log(!wasCancelled ? 'resetting the room' : 'cancelling out the room');
      this.action.status = WAITING_FOR_QUEUE;
      clearTimeout(this.action.timeout);
      this.broadcasters = [];
      this.activePhase = 0;
      this.firstDebator = true;
      this.state = {};
      if (wasCancelled) io.to(this.name).emit('roomWasCancelled');
      else io.to(this.name).emit('roomHasEnded');
    }
    sendRoomState(socket) {
      let leadinTime = 0;
      let time = 0;
      if (this.action.status === LEAD_IN) leadinTime = Date.now() - this.action.timestamp;
      else time = Date.now() - this.action.timestamp;
      let phaseStatus = false;
      if (this.action.status === LEAD_IN && this.firstDebator) phaseStatus = '_player1ToStart';
      else if (this.action.status === USERS_DEBATING && this.state.firstDebator) phaseStatus = '_player1Debating';
      else if (this.action.status === LEAD_IN && !this.firstDebator) phaseStatus = '_player2ToStart';
      else if (this.action.status === USERS_DEBATING && !this.state.firstDebator) phaseStatus = '_player2Debating';
      else if (this.action.status === RESETTING_GAME) phaseStatus = '_announcingWinner';
      let debateStatus = false;
      let mutedUser, unmutedUser
      if(this.action.status===USERS_DEBATING){
        mutedUser = this.broadcasters[1].id;
        unmutedUser = this.broadcasters[0].id;
        if(!this.state.firstDebator){
          unmutedUser = this.broadcasters[1].id;
          mutedUser = this.broadcasters[0].id;
        }
      }
      if (this.state.active) {
        if (this.state.firstDebator) debateStatus = this.broadcasters[0].userName;
        else debateStatus = this.broadcasters[0].userName;
      }
      let state = Object.assign({
        leadinTime,
        totalLeadinTime: this.leadinTime,
        time,
        totalTime: this.debateLength,
        canVote: this.action.status === USERS_DEBATING || this.action.status === LEAD_IN,
        debateStatus,
        phaseStatus,
        viewerCount: this.viewers.length,
        queue: this.queue.map(queuer => { return { 'userId': queuer.userId, 'userName': queuer.userName } }),
        mutedUser,
        unmutedUser,
      }, this.state, {
          sentTime: Date.now()
        });
      let broadcastTarget = socket ? socket : io.to(this.name);
      broadcastTarget.emit('setRoomState', state);
    }
    addViewer(viewer) {
      this.viewers.push(viewer);
      viewer.emit('setUserId', viewer.id);
    }
    removeViewer(viewer) {
      this.removeFromQueue(viewer);
      this.stopBroadcasting(viewer);
      if (this.viewers.indexOf(viewer) < 0) return;
      this.viewers.splice(this.viewers.indexOf(viewer), 1);
    }
    startBroadcasting(broadcaster) {
      this.broadcasters.push(broadcaster);
      broadcaster.emit('prepareToBroadcast');
      //io.to(this.name).emit('broadcasterStarted',broadcaster.id);
    }
    stopBroadcasting(broadcaster) {
      if (this.broadcasters.indexOf(broadcaster) < 0) return;
      if (this.action.status && this.action.status < RESETTING_GAME) this.reset(true);
      this.broadcasters.splice(this.broadcasters.indexOf(broadcaster), 1);
    }
    addToQueue(queuer) {
      this.queue.push(queuer);
      if (this.queue.length > 1 && this.action.status === WAITING_FOR_QUEUE) this.startLoadingBroadcasters();
    }
    removeFromQueue(queuer) {
      if (this.queue.indexOf(queuer) < 0) return;
      this.queue.splice(this.queue.indexOf(queuer), 1);
    }
    getBroadcasterIds() {
      return this.broadcasters.map(broadcaster => broadcaster.id);
    }
    calculateWinner() {
      let winningVote = this.voteTally.reduce((a, b) => {
        if (a === b) return -1;
        return Math.max(a, b);
      });
      if (winningVote === -1) {
        User.findById(this.broadcasters[0].userId)
          .then(foundUser => foundUser.update({ score: foundUser.score + 5 }))
          .catch(err => console.error(err));
        User.findById(this.broadcasters[1].userId)
          .then(foundUser => foundUser.update({ score: foundUser.score + 5 }))
          .catch(err => console.error(err));
        return '_tie';
      } else {
        let user = this.broadcasters[this.voteTally.indexOf(winningVote)];
        User.findById(user.userId)
          .then(foundUser => foundUser.update({ score: foundUser.score + 25 }))
          .catch(err => console.error(err));
        return user.userName;
      }
    }
  }

  Room.createOrFindRoom = name => {
    let room = rooms[name];
    if (!room) {
      room = new Room(name);
      rooms[name] = room;
    }
    return room;
  }

  module.exports = Room;
  return Room;
}