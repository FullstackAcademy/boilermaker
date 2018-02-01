import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const ChannelList = (props) => {
  const { channels } = props;
  return (
    <ReactCSSTransitionGroup
        transitionName="transition"
        transitionAppear={true}
        transitionAppearTimeout={750}
        transitionEnter={false}
        transitionLeave={false}>
      <ListGroup>
        {
          channels.filteredChannelList.map(channel => {
            return (
              <ListGroupItem key={channel.id}>
                <NavLink to={`/channels/${channel.name}`}>
                  <h3>{channel.name}</h3>
                </NavLink>
              </ListGroupItem>
            )
          })
        }
      </ListGroup>
    </ReactCSSTransitionGroup>
  )
}

export default ChannelList;