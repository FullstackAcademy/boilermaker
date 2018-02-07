import React from 'react';
import { Jumbotron, PageHeader } from 'react-bootstrap';

const Welcome = (props) => {
  const { } = props;
  return (
    <div>
      <Jumbotron bsClass={"home-jumbotron"} >
        <div id="welcome-text" className="animated zoomIn">
          <h1>Welcome to Bickr!</h1>
          <p>
            Explore our featured debate categories below or create your very own!
          </p>
        </div>
      </Jumbotron>
    </div>
  )
}

export default Welcome;