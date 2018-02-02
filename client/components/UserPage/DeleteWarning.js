import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function DeleteWarning(props) {


    const { deleteUser, hide, id } = props;
    return (
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            If you click "Delete", you will permanently delete your user information from Bickr's database.
          Click "Delete" if that is your intent. Otherwise, click "Cancel".
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={() => hide('displayWarning')}>Cancel</Button>
            <Button bsStyle="danger" onClick={() => deleteUser(id)}>Delete</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    )
}
