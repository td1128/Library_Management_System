import React, {useState} from 'react';
import { TextField, Button, Container, Stack } from '@mui/material';
import { Link } from "react-router-dom"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const ReturnForm = () => {

    const [memberID, setMemberID] = useState('')
    const [name, setName] = useState('')
    const [isbn, setIsbn] = useState('')
    const [book, setBook] = useState('')
    const [copyNumber, setCopyNumber] = useState('')
    const [issueDate, setIssueDate] = useState('')
    const [returnDate, setReturnDate] = useState('')
    const [rnwRtrn, setRnwRtrn] = useState('')

    const handleMemberSearch = async () => {
        const res = await fetch(`https://library-management-system-f9gh.onrender.com/api/user/profile/${memberID}`)
        .then(res => res.json())

        setName(res.member.first_name + ' ' + res.member.last_name) 

        const books = await fetch(`https://library-management-system-f9gh.onrender.com/api/user/myBooks/current_books/memberId/${memberID}`)
        .then(res => res.json())

        console.log(books);

    }

    const handleBookSearch = async () => {
        const res = await fetch(`https://library-management-system-ce6z.onrender.com/book/isbn/${isbn}`)
        .then(res => res.json())

        console.log(res);
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
                <div>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
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
                </div>
                <Button variant="outlined" color="secondary" type="submit">Issue</Button>
        </div>
  )
}

export default ReturnForm