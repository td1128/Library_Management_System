import {useState} from 'react';
import { TextField, Button, Backdrop, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import Card from './Card';


const ReturnForm = () => {

    const [memberID, setMemberID] = useState('')
    const [member, setMember] = useState('')
    const [books, setBooks] = useState([])

    const [loadingOverlay, setLoadingOverlay] = useState(false);

    const handleMemberSearch = async () => {
        setLoadingOverlay(true);
        const res = await fetch(`${process.env.VITE_APP_API_URL}/${process.env.VITE_APP_USER_PATH}/profile/${memberID}`)
        .then(res => res.json())
        setLoadingOverlay(false);

        if(res.member){
            toast.success('Member Found')
            setMember(res);
            handleBookSearch()
        } else {
            toast.error('Member Not Found')
        }


    }

    const handleBookSearch = async () => {
        setLoadingOverlay(true);
        const res = await fetch(`${process.env.VITE_APP_API_URL}/${process.env.VITE_APP_USER_PATH}/profile/get/library-card-details/${memberID}`)
        .then(res => res.json())
        setLoadingOverlay(false);

        console.log(res);

        const data = res.filter(book => book.status === "occupied")

        console.log(data);
        setBooks(data)
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
                <Button sx={{width: '20ch', height: '5ch', backgroundColor:'#761236', borderRadius:50}} variant="contained" onClick={handleMemberSearch}>Search</Button>
            </div>
            {member? (
                <div>
                    <div>Name: {member?.member?.first_name || '' + ' ' + member?.member?.last_name || ''}</div>
                    <div>Email: {member?.member?.email || ''}</div>
                    <div>Phone: {member?.member?.phone_number || ''}</div>
                    <div>Address: {member?.member?.address || ''}</div>
                </div>
            ): (
                <div></div>
            )}
        </div>
        <div className='flex'>
            {books.map((book, index) => (
                <Card key={index} book={book} member={memberID} />
            ))}
        </div>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loadingOverlay}
        >
            <CircularProgress color="inherit" />
        </Backdrop>

    </div>
  )
}

export default ReturnForm