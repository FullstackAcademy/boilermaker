import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PageHeader } from 'react-bootstrap'

import { fetchCategoryChannels } from '../../store'
import ChannelList from './ChannelList';

class Category extends Component {
  componentDidMount() {
    this.props.getFilteredChannels(this.props.currentCategory.id)
  }
  render() {
    const { channels, currentCategory } = this.props;
    return (
      <div>
        <PageHeader>
          {currentCategory.name} <small>Channel List</small>
        </PageHeader>
        <ChannelList channels={channels} />
      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  const currentCategory = state.categories.find(category => category.name === ownProps.match.params.categoryName);
  return {
    channels: state.channels,
    currentCategory
  }
}

const mapDispatch = (dispatch) => {
  return {
    getFilteredChannels(categoryName) {
      dispatch(fetchCategoryChannels(categoryName))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Category));