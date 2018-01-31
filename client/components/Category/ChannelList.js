import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const ChannelList = (props) => {
  const { channels } = props;
  return (
    <div>
      <ListGroup>
        {
          channels.filteredChannelList.map(channel => {
            return (
              <ListGroupItem key={channel.id} href={`/channels/${channel.name}`}>
                <h3>{channel.name}</h3>
              </ListGroupItem>
            )
          })
        }
      </ListGroup>
    </div>
  )
}

export default ChannelList;