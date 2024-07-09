import { React, useState, useRef, useEffect } from 'react'
import './BookDetailsDesign.css'
import { useNavigate } from 'react-router-dom';

//Material ui icons
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import AddIcon from '@mui/icons-material/Add';
import ShortcutIcon from '@mui/icons-material/Shortcut';

//Modal component material ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { toast } from 'react-toastify';


//Share button feature import
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";
import {
    EmailIcon,
    FacebookIcon,
    LinkedinIcon,
    TelegramIcon,
    XIcon,
    WhatsappIcon,
} from "react-share";

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

//Expect isbn no of the book as props.
export default function UserButtonSection(props) {
    // const isbn_no = "978-0-07-140194-4";//TODO pops.isbn
    const isbn_no = props.isbn;
    const navigate = useNavigate();

    const heartRef = useRef();
    const shareRef = useRef();

    const [heart_class, setHeartClass] = useState('');
    const [isAdded, setIsAdded] = useState(false);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //Share modal details for thumbnail
    const currentPage = window.location.href;// Page location.
    // const currentPage = 'https://images.app.goo.gl/zSMvgT6JDKijd8VL9';
    console.log("page: ", currentPage);
    const title = ' Check out this amazing book \n';
    const DESCRIPTION_LAST = "share a book with you.";
    const USER_NAME = 'Animesh';//This will come from profile reducer.
    const description = USER_NAME + DESCRIPTION_LAST;


    const handleAddtoWishlist = async () => {
        if (isAdded == false) {
            const apiURL = import.meta.env.VITE_APP_API_URL
            const memberId = 28;//TODO 

            toast.info("Request sent to the server.");

            try {
                const response = await fetch(`${apiURL}/api/user/books/wishlist/isbn/${isbn_no}/memberId/${memberId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const json = await response.json()
                if (response.status === 200 && json.message != "Member does not exist") {
                    setIsAdded(true);
                    setHeartClass('heart_icon');

                    toast.success("Book added to your wishlist.");
                }
                else {
                    toast.error(json.message);
                }
                console.log(`Response for add to favorite books isbn - ${isbn_no} :  ${json.message}`);
            } catch (error) {
                toast.error("Something went wrong. Please try again later.")
                console.log('Error while requesing for add to favorite books: ', error)
            }
        }
        else {
            navigate("/")
        }
    }
    const handleShare = () => {
        shareRef.current.click();
    }
    const handleReserveBook = async () => {
        console.log("called handle reserve book");
        const apiURL = import.meta.env.VITE_APP_API_URL
        const memberId = 28;//TODO 

        toast.info("Request sent to the server.");

        try {
            const response = await fetch(`${apiURL}/api/user/books/reserve/isbn/${isbn_no}/memberId/${memberId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const json = await response.json()
            if (response.status === 200) {
                toast.success(json.message)
            }
            else {
                toast.error("Something went wrong. Please try again later.")
            }
            console.log(`Response for add to favorite books isbn - ${isbn_no} :  ${json}`);
        } catch (error) {
            toast.error("Something went wrong. Please try again later.")
            console.log('Error while requesing for reserving the book: ', error)
        }
    }
    return (
        <>
            <div>
                <Button ref={shareRef} onClick={handleOpen} style={{ display: 'none' }}>Open modal</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Share one item
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <EmailShareButton title={title}
                                hashtag="#example" url={currentPage}>
                                <EmailIcon size={40} round={true} />
                            </EmailShareButton>

                            <WhatsappShareButton title={title} descriptionWrapper={description}
                                hashtag="#share" url={currentPage} className='margin_left'>
                                <WhatsappIcon size={40} round={true} />
                            </WhatsappShareButton>

                            <FacebookShareButton title={title} url={currentPage} >
                                <FacebookIcon size={40} round={true} className='margin_left' />
                            </FacebookShareButton>

                            <LinkedinShareButton title={title} url={currentPage} className='margin_left'>
                                <LinkedinIcon size={40} round={true} />
                            </LinkedinShareButton>

                            <TelegramShareButton title={title} url={currentPage} className='margin_left'>
                                <TelegramIcon size={40} round={true} />
                            </TelegramShareButton>

                            <TwitterShareButton title={title} url={currentPage} className='margin_left'>
                                <XIcon size={40} round={true} />
                            </TwitterShareButton>
                        </Typography>
                    </Box>
                </Modal>
            </div>

            <div className="buttons_section">
                <button onClick={handleReserveBook} className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 mb-2 rounded-full" ><AddIcon />Reserve Book</button>
                <button onClick={handleAddtoWishlist} className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded-full" > {isAdded ? <ShortcutIcon /> : <FavoriteIcon ref={heartRef} className={`${heart_class} `} />}  {isAdded ? "Go to wishlist" : "Add to wish list"}</button>
                <div onClick={handleShare} className="share_hover bg-blue-100 ml-4  inline-block border border-blue-700 p-2 rounded-full hover:cursor-pointer hover:bg-blue-500">
                    <ShareOutlinedIcon className='share_icon share_hover' />
                </div>
            </div>
        </>
    )
}
