import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChannelList from './Category-ChannelList';
import { currentChannelList } from '../../utils/currentChannel';
import { PageHeader } from 'react-bootstrap'

const Category = (props) => {
    const { channelList, currCategory } = props;
    return (
        <div>
            <PageHeader>
            {currCategory} <small>Channel List</small>
            </PageHeader>
            <ChannelList channelList={channelList} />
        </div>
    )
}

const mapState = (state, ownProps) => {
    const currCategory = ownProps.match.params.categoryName;
    const channelList = currentChannelList(currCategory, state.channels);
    return {
        currCategory,
        channelList
    }
}

const mapDispatch = (dispatch) => {
    return {
    }
}

export default withRouter(connect(mapState, mapDispatch)(Category));