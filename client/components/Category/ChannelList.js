import React from 'react';
import { PanelGroup, Panel, Image } from 'react-bootstrap';
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

      <div className="category-channel-list animated slideInLeft">
        {
          channels && (
            channels.map(channel => {
              return (
                <div key={channel.id} className="category-channel-list-item animated flipInX">
                  <NavLink to={`/channels/${channel.name}`}>
                    <Image src={`${channel.imageURL}`} className={"category-channel-list-item-image"} />
                  </NavLink>
                  <PanelGroup accordion id="category-channel-list-item-container" defaultActiveKey="2">
                    <Panel eventKey="1">
                      <Panel.Heading componentClass="category-channel-list-item-header">
                        <Panel.Title toggle>
                          {channel.name}
                        </Panel.Title >
                      </Panel.Heading>
                      <Panel.Body collapsible>
                        {channel.description} TEST DESCRIPTION, NEED TO FILL IN
                      </Panel.Body>
                    </Panel>
                  </PanelGroup>
                </div>
              )
            })
          )
        }
      </div>
    </ReactCSSTransitionGroup>
  )
}

export default ChannelList;