import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PageHeader } from 'react-bootstrap'

import ChannelList from './ChannelList';

const Category = (props) => {
  const { channels, currentCategory } = props;
  return currentCategory ? (
    <div>
      <PageHeader>
        {currentCategory.name} <small>Channel List</small>
        <img className="category-page-header-img" src={`${currentCategory.imagePath}`} />
      </PageHeader>
      <ChannelList channels={channels} />
    </div >
  ) : null
}

const mapState = (state, ownProps) => {
  const currentCategory = state.categories.find(category => category.name === ownProps.match.params.categoryName);
  const filteredChannels = state.channels.channelList.filter(channel => channel.categoryId === currentCategory.id);
  return {
    channels: filteredChannels,
    currentCategory
  }
}

export default withRouter(connect(mapState)(Category));
