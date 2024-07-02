import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal6;'

function ChangeConfirmationModal( { show, handleClose } ) {

    const [ enteredStatement, setEnteredStatement ] = useState('');
    const [ enableButton, setEnableButton ] = useState( false );

    const handleInputChange = ( event ) => {
        const value = event.target.value;
        setEnteredStatement( value );

        if( value.trim() === 'Make Changes' ) {
            setEnableButton( enableButton );
        }
    }

  return (
    <Modal show={ show } onHide={ handleClose }>
        <Modal.Header closeButton>
            <Modal.Title>
                Are you sure you want to make the changes?
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                To confirm enter 'Make Changes'.
            </div>
            <input
                required
                value={ enteredStatement }
                placeholder='Make Changes'
                onChange={ handleInputChange }
            />
        </Modal.Body>
        <Modal.Footer>
            <Button disabled={ enableButton }>
                Make Changes
            </Button>
            <Button onClick={ handleClose }>
                Close
            </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default ChangeConfirmationModal;