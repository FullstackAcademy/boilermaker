let appendToMakeUnique = 1;

// Output logging information to console
function log(text) {
  var time = new Date();

  console.log('[' + time.toLocaleTimeString() + '] ' + text);
}

// If you want to implement support for blocking specific origins, this is
// where you do it. Just return false to refuse WebSocket connections given
// the specified origin.
function originIsAllowed(origin) {
  return true;    // We will accept all connections
}

// Scans the list of users and see if the specified name is unique. If it is,
// return true. Otherwise, returns false. We want all users to have unique
// names.
function isUsernameUnique(name) {
  var isUnique = true;
  var i;

  for (i = 0; i < connectionArray.length; i++) {
    if (connectionArray[i].username === name) {
      isUnique = false;
      break;
    }
  }
  return isUnique;
}

//Sends a message (which is already stringified JSON) to a single
// user, given their username. We use this for the WebRTC signaling,
// and we could use it for private text messaging.
function sendToOneUser(target, msgString) {
  var isUnique = true;
  var i;

  for (i = 0; i < connectionArray.length; i++) {
    if (connectionArray[i].username === target) {
      connectionArray[i].sendUTF(msgString);
      break;
    }
  }
}

// Scan the list of connections and return the one for the specified
// clientID. Each login gets an ID that doesn't change during the session,
// so it can be tracked across username changes.
function getConnectionForID(id) {
  var connect = null;
  var i;

  for (i = 0; i < connectionArray.length; i++) {
    if (connectionArray[i].clientID === id) {
      connect = connectionArray[i];
      break;
    }
  }

  return connect;
}

// Builds a message object of type "userlist" which contains the names of
// all connected users. Used to ramp up newly logged-in users and,
// inefficiently, to handle name change notifications.
function makeUserListMessage() {
  var userListMsg = {
    type: 'userlist',
    users: []
  };
  var i;

  // Add the users to the list

  for (i = 0; i < connectionArray.length; i++) {
    userListMsg.users.push(connectionArray[i].username);
  }

  return userListMsg;
}

// Sends a "userlist" message to all chat members. This is a cheesy way
// to ensure that every join/drop is reflected everywhere. It would be more
// efficient to send simple join/drop messages to each user, but this is
// good enough for this simple example.
function sendUserListToAll() {
  var userListMsg = makeUserListMessage();
  var userListMsgStr = JSON.stringify(userListMsg);
  var i;

  for (i = 0; i < connectionArray.length; i++) {
    connectionArray[i].sendUTF(userListMsgStr);
  }
}


module.exports = (io, connectionArray, nextID) => {
//Creating WebSocket connections is really simple. 
  //All you have to do is call the WebSocket constructor and pass in the URL of your server.
  //
  //accept the request and get a connection

  //add the new connection to the list of connections

  //send the new client a token that states what username message they want to 
  //use

  //

}


/*
  io.on('connection', (socket) => {
    console.log(socket)

    console.log(`A socket connection to the server has been made: ${socket.id}`)
    //console.log(socket)
    console.log('socket.request = ', socket.request)
    console.log('socket.client.id is ', socket.client.id)
    console.log('socket.clientID is ', socket.clientID)
    //
    //code ran to include remote address
    //in many example code such as:
    //https://github.com/mdn/samples-server/blob/master/s/webrtc-from-chat/chatserver.js#L49
    //note: connection is equivalent to a socket instance
    //
    //https://davidwalsh.name/demo/websockets.zip
    //https://medium.com/@martin.sikora/node-js-websocket-simple-chat-tutorial-2def3a841b61

    // Add the new connection to our list of connections.
    connectionArray.push(socket);
    socket.client.id = nextID;
    nextID++;
    // Send the new client its token; it send back a "username" message to
    // tell us what username they want to use.
    socket.on('message', (message) => {

    })
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })



connection.on('message', function(message) {
  });

  // Handle the WebSocket "close" event; this means a user has logged off
  // or has been disconnected.
  connection.on('close', function(reason, description) {
    // First, remove the connection from the list of connections.
    connectionArray = connectionArray.filter(function(el, idx, ar) {
      return el.connected;
    });

    // Now send the updated user list. Again, please don't do this in a
    // real application. Your users won't like you very much.
    sendUserListToAll();

    // Build and output log output for close information.

    var logMessage = 'Connection closed: ' + connection.remoteAddress + ' (' +
                     reason;
    if (description !== null && description.length !== 0) {
      logMessage += ': ' + description;
    }
    logMessage += ')';
    log(logMessage);
  });

  */
