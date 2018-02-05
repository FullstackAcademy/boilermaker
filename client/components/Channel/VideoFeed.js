import React from 'react';
import { Button, Panel } from 'react-bootstrap';

import socket from '../../socket';

const VideoFeed = props => {
  const { connection, channel } = props;
  connection.dontOverrideSession = true;

  const startSession = function () {
    connection.checkPresence(channel, (isRoomExist, roomid) => {
      if (isRoomExist === true) {
        if (connection.broadcasters.length > 2) {
          connection.session = {
            audio: true,
            video: true,
            oneway: true
          };
        }
        connection.join(roomid);
      } else {
        connection.open(roomid);
      }
    });
  }
  return (
    <div>
      <Button onClick={startSession}>
        Start Video Chat
      </Button>
    </div>
  )
}

export default VideoFeed;