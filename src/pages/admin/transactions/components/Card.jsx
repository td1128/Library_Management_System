import React from 'react'

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { toast } from 'react-toastify';


export const handleReturn = async (memberID, isbn) =>  { 
    console.log(memberID, isbn);
    const res = await fetch("https://library-management-system-ce6z.onrender.com/api/admin/transaction/return", {
        method: "PUT", // Specify the method
        headers: {
          'Content-Type': 'application/json' // Specify the content type
        },
        body: JSON.stringify({
            membership_id : String(memberID),
            isbn : String(isbn)
    }),
      })
      .then(res => res.json())
      .then(response => { toast.info(response.message) });

      console.log(res);
}
export const handleRenew = async (memberID, isbn) =>  { 
        const res = await fetch("https://library-management-system-ce6z.onrender.com/api/admin/transaction/return", {
            method: "PUT", // Specify the method
            headers: {
              'Content-Type': 'application/json' // Specify the content type
            },
            body: JSON.stringify({
                membership_id : String(memberID),
            isbn : String(isbn)
        }),
          })
          .then(res => res.json())
          .then(response => { toast.info(response.message) });

          console.log(res);
    }



const Card = (props) => {

    const [openRenew, setOpenRenew] = React.useState(false);
    const [openReturn, setOpenReturn] = React.useState(false);
    const handleOpenRenew = () => setOpenRenew(true);
    const handleCloseRenew = () => setOpenRenew(false);
    const handleOpenReturn = () => setOpenReturn(true);
    const handleCloseReturn = () => setOpenReturn(false);



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
      


  return (
    <div className=' p-4 m-4 b-2 border-black border-2'>
        <div>Book: {props.book.book_title} </div>
        <div>Author: {props.book.author_name}</div>
        <div>ISBN: {props.book.isbn}</div>
        <div>Issue Date: {props.book.issue_date}</div>
        <div>Return Date: {props.book.due_date}</div>
        <div className='flex justify-between'>
        <Button onClick={handleOpenReturn}>Return</Button>
        <Modal
            open={openReturn}
            onClose={handleCloseReturn}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} >
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Are you sure you want to return this book?
            </Typography>
            <div className='flex'>
                <Button onClick={() => handleReturn(props.member, props.book.isbn)}>Yes</Button>
                <Button onClick={handleCloseReturn}>No</Button>
            </div>
            </Box>
        </Modal>
        <Button onClick={handleOpenRenew}>Renew</Button>
        <Modal
            open={openRenew}
            onClose={handleCloseRenew}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} >
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Are you sure you want to renew this book?
            </Typography>
            <div className='flex'>
                <Button onClick={() => handleRenew(props.member, props.book.isbn)}>Yes</Button>
                <Button onClick={handleCloseRenew}>No</Button>
            </div>
            </Box>
        </Modal>
        </div>
    </div>
  )
}

export default Card