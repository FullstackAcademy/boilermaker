import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'

const ChannelList = (props) => {
    const { channelList } = props;
    return (
        <div>
            <ListGroup>
                {
                    channelList.map(channel => {
                        return (
                            <ListGroupItem key={channel.id}>
                                <NavLink to ={`/channels/${channel.name}`}><h3>{channel.name}</h3></NavLink>
                            </ListGroupItem>
                        )
                    })
                }
            </ListGroup>
        </div>
    )
}

export default ChannelList;