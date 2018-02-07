import React from 'react';
import { NavLink } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';

const QueueBar = (props) => {
  const { queueList } = props;
  return (
    <div className="queue-bar-container">
      <h1 className="queue-bar-headline">Players in Queue:</h1>
      <Breadcrumb className="queue-bar">
        {
          queueList.slice(0,7).map(queue => {
            return (
              <Breadcrumb.Item>
                <NavLink to={`/users/${queue.userId}`}>
                  {queue.userName},
                </NavLink>
              </Breadcrumb.Item>
            )
          })
        }
      </Breadcrumb>
    </div>
  )
}

export default QueueBar;