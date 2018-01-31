import React from 'react';
import { Jumbotron } from 'react-bootstrap';

const Welcome = (props) => {
  const { } = props;
  return (
    <div>
      <Jumbotron>
        <h1>Welcome to Bickr!</h1>
        <p>
          Explore our current debate categories below or create your very own!
        </p>
      </Jumbotron>
    </div>
  )
}

export default Welcome;