import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'
import { } from '../store';

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
                  <li>
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

/* PLACE THIS FUNCTION INTO CHANNEL

import Prompts from './Prompts';

  constructor() {
            super()
    this.state = {
            togglePrompt: false
    }
    this.displayPrompt = this.displayPrompt.bind(this);
  }


displayPrompt() {
            this.state.togglePrompt ? this.setState({ togglePrompt: false }) : this.setState({ togglePrompt: true });
          }

        {
          this.state.togglePrompt && <Prompts displayPrompt={this.displayPrompt} />
        }
        <Button className="open-button" bsSize={"large"} onClick={this.displayPrompt}>
          +
        </Button>



.modal-content{
  background-color: rgb(45, 45, 45);
  color: rgb(255, 255, 255);
  opacity: 0.98;
}

.modal-title{
  color: rgb(255, 255, 255);
  text-align: center;
  font-size: 0.75em;
}

.modal-header{
  color: #f08f36;
  text-align: center;
  font-size: 2em;
}

.open-button{
  border-radius: 100%
}
          */