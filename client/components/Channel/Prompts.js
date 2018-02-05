import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'

const Prompts = (props) => {
  const { displayPrompt } = props;
  const prompts = ['Would you fight 100 duck-sized horses or 1 horse-sized duck?', 'Kill one, F*** One, Marry One?', 'Would you rather drown to death or starve to death?']
  let count = 0;
  return (
    <div>
      <Modal
        show={true}
        autoFocus={true}
      >
        <Modal.Header>
          List of Prompts
        </Modal.Header>
        <Modal.Title>
          (Order of prompts: #1 = first)
        </Modal.Title>
        <Modal.Body>
          <ul>
            {
              prompts.map(prompt => {
                count++;
                return (
                  <li key={count}>
                    #{count}: {prompt}
                  </li>
                )
              })
            }
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={displayPrompt}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Prompts;