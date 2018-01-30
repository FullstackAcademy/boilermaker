import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChannelList from './Category-ChannelList';
import { currentChannelList } from '../../utils/currentChannel';

const Category = (props) => {
    const { channelList } = props;
    return (
        <div>
            <ChannelList channelList={channelList}/>
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