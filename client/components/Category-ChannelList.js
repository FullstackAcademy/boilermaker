import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const ChannelList = (props) => {
    const { channelList } = props;
    return (
        <div>
            <ListGroup>
                {
                    channelList.map(channel => {
                        return (
                            <ListGroupItem href={`/channels/${channel.name}`}>
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