import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PageHeader } from 'react-bootstrap'

import { fetchFilteredChannels } from '../../store'
import ChannelList from './ChannelList';

class Category extends Component {
  componentDidMount() {
    this.props.getFilteredChannels(this.props.currCategory)
  }
  render() {
    const { channels, currCategory } = this.props;
    return (
      <div>
        <PageHeader>
          {currCategory} <small>Channel List</small>
        </PageHeader>
        <ChannelList channels={channels} />
      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  const currCategory = ownProps.match.params.categoryName;
  return {
    channels: state.channels,
    currCategory
  }
}

const mapDispatch = (dispatch) => {
  return {
    getFilteredChannels(categoryName) {
      dispatch(fetchFilteredChannels(categoryName))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Category));