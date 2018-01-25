import React from 'react';
import { connect } from 'react-redux';
import socket from '../socket';

import { Button, Panel } from 'react-bootstrap';
//import { newMessage } from '../store';

const VideoFeed = props => {
    console.log('video feed rendered')
    const { connection, channel } = props;
    connection.dontOverrideSession = true;

    console.log(channel);
    return (
        <div>
            {connection.checkPresence(channel, (isRoomExist, roomid) => {
                console.log('CHECK IT OUTTTTTTTTTTTT', connection.broadcasters);
                connection.broadcasters.push(connection.userid);
                console.log(connection.userid);
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
            })}
        </div>
    )
}

export default VideoFeed;