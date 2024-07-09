import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ChangeConfirmationModal({ show, handleClose, onConfirm }) {

  const inputRef = useRef(null);

  const [enteredStatement, setEnteredStatement] = useState('');
  const [enableButton, setEnableButton] = useState(false);

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const handleKeyDown = (event) => {
    if (enableButton === true && event.key === 'Enter') {
      handleConfirmation();
    }
  }

  const handleInputChange = (event) => {
    const value = event.target.value;
    setEnteredStatement(value);

    if (value.trim() === 'Make Changes') {
      setEnableButton(true);
    } else {
      setEnableButton(false);
    }
  }

  const handleConfirmation = () => {
    setEnteredStatement('');
    if (enableButton) {
      onConfirm();
    }
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          Are you sure you want to make the changes?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body onKeyDown={handleKeyDown}>
        <div style={{ fontSize: '19px' }}>
          To confirm enter 'Make Changes'.
        </div>
        <input
          required
          value={enteredStatement}
          placeholder='Make Changes'
          onChange={handleInputChange}
          style={{ outline: '2px solid black', marginTop: '16px', width: '100%', borderRadius: '5px', padding: '3px 5px' }}
          ref={inputRef}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleConfirmation} disabled={!enableButton}>
          Make Changes
        </Button>
        <Button onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ChangeConfirmationModal;
