import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { createChannel, fetchChannels } from '../store';
import { currentChannelList } from '../../utils/currentChannel';

const Category = (props) => {
    const { channelList } = props;
    return (
        <div>
            <ul>
                {
                    channelList.map(channel => {
                        return (
                            <li key={channel.id}>
                                <NavLink to={`/channels/${channel.name}`} >
                                    <h3>
                                        {channel.name}
                                    </h3>
                                </NavLink>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

const mapState = (state, ownProps) => {
    const currCategory = ownProps.match.params.categoryName;
    const channelList = currentChannelList(currCategory, state.channels);
    return {
        channelList
    }
}

const mapDispatch = (dispatch) => {
    return {
    }
}

export default withRouter(connect(mapState, mapDispatch)(Category));