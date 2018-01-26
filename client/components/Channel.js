import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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
        const { currentChannel } = this.props;
        return (
            <div>
                <h1>{currentChannel.name}</h1>
                <div>
                    <VideoFeed connection={this.state.connection} channel={this.state.connection.channel} />
                </div>
            </div>
        )
    }
}

const mapState = (state, ownProps) => {
    const currentChannel = state.channels.find(channel => channel.id === Number(ownProps.match.params.channelId))
    return {
        currentChannel
    }
}


// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState)(Channel))