import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'

function ConfirmationWIthCurrentPassword( { show, handleClose, statement, apiCall } ) {

    const [ enteredPassword, setEnteredPassword ] = useState('');

    const handleInputChange = ( event ) => {
        const value = event.target.value;
        setEnteredPassword( value );
    }

  return (
    <Modal show={ show } onHide={ handleClose }>
        <Modal.Header closeButton>
            <Modal.Title>
                {
                    `${ statement }`
                }
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                To confirm enter the current password.
            </div>
            <input
                required
                value={ enteredPassword }
                placeholder='Current Password'
                onChange={ handleInputChange }
            />
        </Modal.Body>
        <Modal.Footer>
            <Button>
                Confirm
            </Button>
            <Button onClick={ handleClose }>
                Close
            </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default ConfirmationWIthCurrentPasswords