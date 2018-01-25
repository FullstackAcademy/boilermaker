import React, { Component } from 'react';
import { connect } from 'react-redux';
import socket from '../socket';

import { Button, Panel } from 'react-bootstrap';
import VideoFeed from './VideoFeed';
//import { newMessage } from '../store';

class Channel extends Component {

    constructor() {
        super();
        this.state = {
            connection: new RTCMultiConnection(),
        }
    }

    render() {
        //console.log(this.state.connection)
        console.log(this.state.connection.sessionid)

        return (
            <div>
                <div>
                    <VideoFeed connection={this.state.connection} channel={this.state.connection.channel} />
                </div>
            </div>
        )
    }
}

const mapState = (state) => {
    return {
    }
}


// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState)(Channel)