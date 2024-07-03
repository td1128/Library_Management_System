import React, {useState} from 'react';
import { TextField, Button, Container, Stack } from '@mui/material';
import { Link } from "react-router-dom"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { toast } from 'react-toastify';


const ReturnForm = () => {

    const date = new Date();

    const [memberID, setMemberID] = useState('')
    const [name, setName] = useState('')
    const [isbn, setIsbn] = useState('')
    const [book, setBook] = useState('')
    const [copyNumber, setCopyNumber] = useState('')
    const [returnDate, setReturnDate] = useState('')
    const [rnwRtrn, setRnwRtrn] = useState('')

    const handleMemberSearch = async () => {
        const res = await fetch(`https://library-management-system-f9gh.onrender.com/api/user/profile/${memberID}`)
        .then(res => res.json())

        if(res.member){
            toast.success('Member Found')
        } else {
            toast.error('Member Not Found')
        }

        setName(res.member.first_name + ' ' + res.member.last_name) 

    }

    const handleBookSearch = async () => {
        const res = await fetch(`https://library-management-system-ce6z.onrender.com/api/common/book/isbn/${isbn}`)
        .then(res => res.json())

        console.log(res);

        if(res.book){
            toast.success('Book Found')
        } else {
            toast.error('Book Not Found')
        }

        setBook(res.book.title)
    }

    const handleSubmit = async (rtrnRnw) => { 

        if(rtrnRnw === 'Return'){
            const res = await fetch("https://library-management-system-f9gh.onrender.com/api/admin/transaction/return", {
                method: "POST",
                body: JSON.stringify({
                    "membership_id" : memberID,
                    "isbn" : isbn,
                    "return_date" : `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
                    "copy_no" : 1,
                    "lib_card_no" : 1
            }),
              });
    
              console.log(res);
        } else {
        const res = await fetch("https://library-management-system-f9gh.onrender.com/api/admin/transaction/issue", {
            method: "PUT",
            body: JSON.stringify({
                    "membership_id": memberID,
                    "isbn": isbn,
                    "issue_date" : `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
                    "copy_no" : copyNumber,
                    "status" : "issued",
                    "lib_card_no" : 1,
                    "due_date" : returnDate
                    
                }),
          });

          console.log(res);
    }
}

  return (
    <div>
                <div className=' flex flex-col mb-8 space-y-6'>
                    <div className=' flex space-x-4'>
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="Member ID"
                            fullWidth
                            required
                            value={memberID}
                            onChange={(e) => setMemberID(e.target.value)}
                        />
                        <Button sx={{width: '20ch', height: '5ch'}} variant="contained" onClick={handleMemberSearch}>Search</Button>
                    </div>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Name"
                        fullWidth
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className=' flex flex-col space-y-6'>
                    <div className=' space-x-4 flex'>
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="ISBN Number"
                            fullWidth
                            required
                            value={isbn}
                            onChange={(e) => setIsbn(e.target.value)}
                        />
                        <Button sx={{width: '20ch', height: '5ch'}} variant="contained" onClick={handleBookSearch}>Search</Button>
                    </div>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Book"
                        fullWidth
                        required
                        value={book}
                        onChange={(e) => setBook(e.target.value)}
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Copy Number"
                        required
                        fullWidth
                        value={copyNumber}
                        onChange={(e) => setCopyNumber(e.target.value)}
                    />
                </div>
                <div className=' flex space-x-4 mt-4'>
                    <FormControl sx={{ minWidth: 240 }}>
                        <InputLabel id="demo-simple-select-helper-label">Renew/Return</InputLabel>
                        <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={rnwRtrn}
                        label="Renew/Return"
                        onChange={(event) => setRnwRtrn(event.target.value)}
                        >
                        <MenuItem value={"Renew"}>Renew</MenuItem>
                        <MenuItem value={"Return"}>Return</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="DD-MM-YYYY"
                        required
                        fullWidth
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                    />
                </div>
                <Button variant="outlined" color="secondary" type="submit" onClick={() => {handleSubmit(rtrnRnw)}}>Submit</Button>
        </div>
  )
}

export default ReturnForm