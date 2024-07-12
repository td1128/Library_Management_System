import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { handleRenew, handleReturn } from './Card';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

 
export default function FormModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [disabled, setDisabled] = React.useState(false);

  // if (props['data']['status'] === 'returned') {
  //   setDisabled(true);
  // }

  return (
    <div>
      <Button onClick={handleOpen} disabled={disabled}>Renew/Return</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
                Are you sure you want to renew/return this book?
          </Typography>
            <div className='flex'>
                <Button onClick={() => {
                    handleRenew(props['data']['member id'], props['data']['book']);
                    handleClose();
                  }}
                  >Renew
                </Button>
                <Button 
                  onClick={() => {
                    handleReturn(props['data']['member id'], props['data']['book']);
                    handleClose();
                  }}
                >
                  Return
                </Button>
            </div>
        </Box>
      </Modal>
    </div>
  );
}
