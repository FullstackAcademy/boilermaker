import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'

// const Prompts = (props) => {
//   const { displayPrompt } = props;
//   const prompts = ['Would you fight 100 duck-sized horses or 1 horse-sized duck?', 'Kill one, F*** One, Marry One?', 'Would you rather drown to death or starve to death?']
//   let count = 0;
//   return (
//     <div className="prompts">
//       <Modal
//         show={true}
//         autoFocus={true}
//       >
//         <Modal.Header>
//           List of Prompts
//         </Modal.Header>
//         <Modal.Title>
//           (Order of prompts: #1 = first)
//         </Modal.Title>
//         <Modal.Body>
//           <ul>
//             {
//               prompts.map(prompt => {
//                 count++;
//                 return (
//                   <li key={count}>
//                     #{count}: {prompt}
//                   </li>
//                 )
//               })
//             }
//           </ul>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button onClick={displayPrompt}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   )
// }

const Prompts = (props) => {
  const { displayPrompt, display } = props;
  const prompts = ['Would you fight 100 duck-sized horses or 1 horse-sized duck?', 'Tomato or Tomahto?', 'Would you rather drown to death or starve to death?']
  let count = 0;
  let animate = display ? 'animated slideInDown' : 'animated slideOutUp';
  return (
    <div id="prompt-box" className={animate}>
      
        <h3 id="prompt-box-header">
          List of Prompts
        </h3>
        <h5 id="prompt-box-subheader">
          (Order of prompts: #1 = first)
        </h5>
        <div id="prompts">
            {
              prompts.map(prompt => {
                count++;
                return (
                  <p key={count}>
                    #{count}: {prompt}
                  </p>
                )
              })
            }
        </div>
          <Button onClick={displayPrompt}>
            Close
          </Button>
    </div>
  )
}

export default Prompts;