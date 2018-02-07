import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'

const Prompts = (props) => {
  const { display, prompts } = props;
  return (
    <div className="prompt-box animated slideInDown">
        {
          prompts && prompts.length > 0
            ?
            <div>
            <h3 id="prompt-box-header">
              List of Prompts
            </h3>
            <h5 id="prompt-box-subheader">
              (Order of prompts: #1 = first)
            </h5>
            </div>
            :
            <h3 id="prompt-box-header">
              No Prompts Yet
            </h3>
        }
        <div id="prompts">
            {
              prompts && prompts.map((prompt, idx) => {
                return (
                  <p key={prompt}>
                    #{idx + 1}: {prompt}
                  </p>
                )
              })
            }
        </div>
          <Button onClick={() => display('togglePrompt')}>
            Close
          </Button>
    </div>
  )
}

export default Prompts;