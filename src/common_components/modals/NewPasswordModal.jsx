import React from 'react'
import Modal from 'react-bootstrap/Modal'

function NewPasswordModal({ show, handleClose }) {
  return (
    <Modal show={ show } onHide={ handleClose }>
        <Modal.Header closeButton>
            Enter the new password.
        </Modal.Header>
        <Modal.Body>
            <div>
                New Password:
            </div>
            <input
                placeholder='New Password'
            />
            <div>
                Re-enter Password:
            </div>
            <input
                placeholder='Re-enter Password'
            />
        </Modal.Body>
    </Modal>
  )
}

export default NewPasswordModal