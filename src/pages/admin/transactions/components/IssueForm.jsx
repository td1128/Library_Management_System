import {useState} from 'react';
import { TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { Backdrop, CircularProgress } from '@mui/material';



const IssueForm = () => {

    const date = new Date();

    const [memberID, setMemberID] = useState('')
    const [member, setMember] = useState('')
    const [isbn, setIsbn] = useState('')
    const [book, setBook] = useState('')
    const [copyNumber, setCopyNumber] = useState('')
    const [bookAvailable, setBookAvailable] = useState(false)
    const [cardAvailable, setCardAvailable] = useState(false)

    const [backDrop, setBackDrop] = useState(false);

    const handleMemberSearch = async () => {
        setBackDrop(true);
        const res = await fetch(`${process.env.VITE_APP_API_URL}/${process.env.VITE_APP_USER_PATH}/profile/${memberID}`)
        .then(res => res.json())
        setBackDrop(false);

        console.log(res);

        if(res.member){

            toast.success('Member Found')
            if(res.member.library_card_string.includes('0')){
                console.log(cardAvailable)
                setCardAvailable(true)
                console.log(cardAvailable)
            }
            setMember(res);
            console.log(member.member.library_card_string.indexOf('0'))
        } else {
            toast.error('Member Not Found')
        }

    }

    const handleBookSearch = async () => {
        setBackDrop(true);
        const res = await fetch(`${process.env.VITE_APP_API_URL}/${process.env.VITE_APP_COMMON_PATH}/book/isbn/${isbn}`)
        .then(res => res.json())
        setBackDrop(false);

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

    const handleSubmit = async () => { 
        if(!member || !book){
            toast.error('Member or Book not found')
            return;
        }
        if(!cardAvailable){
            toast.error('Cards not available')
            return;
        }
        if(!bookAvailable){
            toast.error('Book not available')
            return;
        }
        setBackDrop(true);
        const res = await fetch(`${process.env.VITE_APP_API_URL}/${process.env.VITE_APP_ADMIN_PATH}/transaction/issue`, {
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
        setBackDrop(false);

          console.log(res);
    }

  return (
    <div>
        <div className=' flex space-x-4 mb-4'>
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
                <Button sx={{width: '20ch', height: '5ch', backgroundColor:'#761236', borderRadius:50}} variant="contained" onClick={handleMemberSearch}>Search</Button>
                </div>
                {member? (
                    <div className=' flex flex-col '>
                        <div>Name: {member?.member?.first_name || '' + ' ' + member?.member?.last_name || ''}</div>
                        <div>Email: {member?.member?.email || ''}</div>
                        <div>Phone: {member?.member?.phone_number || ''}</div>
                        <div>Address: {member?.member?.address || ''}</div>
                        <div>Cards available: {cardAvailable? 'Available' : 'Unavailable'} : {member?.member?.library_card_string || '0'}</div>
                    </div>
                    ):(
                    <div></div>
                )}
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
                    <Button sx={{width: '20ch', height: '5ch', backgroundColor:'#761236', borderRadius:50}} variant="contained" onClick={handleBookSearch}>Search</Button>
                </div>
                {book? (
                    <div>
                        <div>Book Name: {book?.book?.title || ''}</div>
                        <div>Authon: {book?.author_name || ''}</div>
                        <div>Subject: {book?.sub_name || ''}</div>
                        <div>Date of Publication: {book?.book?.date_of_publication || ''}</div>
                        <div>Availability: {bookAvailable? 'Available' : 'Unavailable'} : {book?.book?.no_of_copies || '0'}</div>
                    </div>
                ): (
                    <div></div>
                )}
            </div>
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
        <Button variant="contained" sx={{width: '20ch', height: '5ch', backgroundColor:'#761236', borderRadius:50}} color="secondary" type="submit" onClick={handleSubmit}>Issue</Button>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={backDrop}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
    </div>
  )
}

export default IssueForm