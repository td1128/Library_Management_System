import React, {useState} from 'react';
import { TextField, Button, Container, Stack } from '@mui/material';
import { Link } from "react-router-dom"
import { toast } from 'react-toastify';



const IssueForm2 = () => {

    const date = new Date();

    const [memberID, setMemberID] = useState('')
    const [member, setMember] = useState('')
    const [isbn, setIsbn] = useState('')
    const [book, setBook] = useState('')
    const [copyNumber, setCopyNumber] = useState('')
    const [bookAvailable, setBookAvailable] = useState(false)
    const [cardAvailable, setCardAvailable] = useState(false)

    const handleMemberSearch = async () => {
        const res = await fetch(`https://library-management-system-f9gh.onrender.com/api/user/profile/${memberID}`)
        .then(res => res.json())

        console.log(res);

        if(res.member){
            toast.success('Member Found')
            if(res.member.library_card_string.includes('0')){
                setCardAvailable(true)
            }
            setMember(res);
            console.log(member.member.library_card_string.indexOf('0'))
        } else {
            toast.error('Member Not Found')
        }

    }

    const handleBookSearch = async () => {
        const res = await fetch(`https://library-management-system-ce6z.onrender.com/api/common/book/isbn/${isbn}`)
        .then(res => res.json())

        console.log(res);

        if(res.book){
            toast.success('Book Found')
            setBook(res)
            if(res.book.no_of_copies != 0){
                setBookAvailable(true)
            }
        } else {
            toast.error('Book Not Found')
        }
    }

    const handleSubmit = async (e) => { 
        if(!member || !book){
            toast.error('Member or Book not found')
            return;
        }
        const res = await fetch("https://library-management-system-ce6z.onrender.com/api/admin/transaction/issue", {
            method: "PUT", // Specify the method
            headers: {
              'Content-Type': 'application/json' // Specify the content type
            },
            body: JSON.stringify({
                membership_id : String(memberID),
                isbn : String(isbn),
                copy_no : 1,
                lib_card_no : member?.member?.library_card_string.indexOf('0') + 1
        }),
          })
          .then(res => res.json())
          .then(response => { toast.info(response.message) });

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
                    <div>
                        <div>Name: {member?.member?.first_name || '' + ' ' + member?.member?.last_name || ''}</div>
                        <div>Email: {member?.member?.email || ''}</div>
                        <div>Phone: {member?.member?.phone_number || ''}</div>
                        <div>Address: {member?.member?.address || ''}</div>
                        <div>Cards available: {cardAvailable? 'Available' : 'Unavailable'} : {member?.member?.library_card_string || '0'}</div>
                    </div>
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
                    <div>
                        <div>Book Name: {book?.book?.title || ''}</div>
                        <div>Authon: {book?.author_name || ''}</div>
                        <div>Subject: {book?.sub_name || ''}</div>
                        <div>Date of Publication: {book?.book?.date_of_publication || ''}</div>
                        <div>Availability: {bookAvailable? 'Available' : 'Unavailable'} : {book?.book?.no_of_copies || '0'}</div>
                    </div>
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
                <Button variant="outlined" color="secondary" type="submit" onClick={handleSubmit}>Issue</Button>
        </div>
  )
}

export default IssueForm2