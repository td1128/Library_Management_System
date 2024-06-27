import { React, useState, useRef, useEffect } from 'react'
import './BookDetailsDesign.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faAngleDown, faAngleUp, faShareNodes, faArrowLeft, faCheck, faXmark, faCircleDot, faCircle, faL } from '@fortawesome/free-solid-svg-icons'//Use material ui;
import { unstable_useViewTransitionState, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchRelatedBookList } from '../../../features/relatedBoolReducer/RelatedBookReducer';


//Material ui icons
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
//Modal component material ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

//Loading component
import CircularProgress from '@mui/material/CircularProgress';

//Card component
import MediaCard from './card_body';

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

//This component accepts ISBN no of the book as props.
export default function ShowBookDetails(props) {
  const isbn_no = "978-0-19-852663-6";//TODO pops.book.isbn
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRelatedBookList(isbn_no));
  }, [dispatch])

// dispatch(fetchRelatedBookList(isbn_no))
  // const book = bookList[isbn_no];//TODO props.book
  const book = {shelving_no: "sh-2-4", isbn: '978-3-16-148410-1', author: "abcd", title: "Learn C++ online", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, voluptate qui provident fuga mollitia voluptas molestiae magni quidem nobis dicta totam iste animi! Fuga veritatis iure earum ipsum soluta! Molestiae", dateOfPublication: "2023", publisher: "Mc Graw Hill", no_of_copies: 1 };

  //Book details
  const shelVingNo = book.shelving_no;
  const author = book.author;
  const book_title = book.title;
  const date_publication = book.dateOfPublication;
  const des = book.description;
  const publisher = book.publisher;
  const noOfCopies = book.no_of_copies;

  //Getting book list from book list state
  const relatedBookList =  useSelector((state) => state.relatedBookList.books);
  const loading = useSelector((state)=> state.relatedBookList.loading);
  console.log("Related books : ", relatedBookList);


  //Share modal details for thumbnail
  // const currentPage = window.location.href;// Page location.
  const currentPage = 'https://images.app.goo.gl/zSMvgT6JDKijd8VL9';
  console.log("page: ",currentPage);
  const title = ' Check out this amazing book \n';
  const DESCRIPTION_LAST = "share a book with you.";
  const USER_NAME = 'Animesh';//This will come from profile reducer.
  const description = USER_NAME+DESCRIPTION_LAST;


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const upRef = useRef();
  const downRef = useRef();
  const heartRef = useRef();
  const shareRef = useRef();

  const description_length = 150;
  const [details, setDetails] = useState(des.substring(0, description_length));
  const [read, setRead] = useState("More");
  const [heart_class, setHeartClass] = useState('');

  const handleMoreDetails = () => {
    details == des ? setDetails(des.substring(0, 150)) : setDetails(des);
    read == "More" ? setRead("Less") : setRead("More");

    upRef.current.style.display == "none" ? upRef.current.style.display = "inline" : upRef.current.style.display = "none";
    downRef.current.style.display == "none" ? downRef.current.style.display = "inline" : downRef.current.style.display = "none";
  }

  const handleAddtoWishlist = async () => {
    setHeartClass('heart_icon')
    const apiURL = import.meta.env.VITE_APP_API_URL
    const memberId = 28;//TODO 

    try {
      const response = await fetch(`${apiURL}/api/user/books/wishlist/isbn/${isbn_no}/memberId/${memberId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json()
      console.log(`Response for add to favorite books isbn - ${isbn_no} :  ${json}`);
    } catch (error) {
      console.log('Error while requesing for add to favorite books: ', error)
    }
  }
  const handleShare = () => {
    shareRef.current.click();
  }

  const handleBackButton = () => {
    navigate(-1);
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
                <FacebookIcon size={40} round={true} className='margin_left'/>
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

      <div className="container">
        <div className="book_section">
          <div className="book_image">
            <img src="/book_img2.png" alt="Loading image!" className='image shadow-lg border border-blue-700 ' />
          </div>
          <div className="buttons_section">
            <button onClick={handleAddtoWishlist} className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded-full" ><FavoriteIcon ref={heartRef} className={`${heart_class} `}/>  Add to wish list</button>
            <div onClick={handleShare} className="share_hover bg-blue-100 ml-4  inline-block border border-blue-700 p-2 rounded-full hover:cursor-pointer hover:bg-blue-500">
              <ShareOutlinedIcon className='share_icon share_hover'/>
            </div>
          </div>
        </div>


        <div className="book_details_section">
          <div className="book_features">

            <span className="book_title">{book_title} <span className={`noOfCopies ${noOfCopies>0?'in_stock':'out_stock'}`}>{noOfCopies>0?"In Stock":"Out of Stock"}</span></span>

            <span className='author'>by  {author}</span>
            
            <span className='mt-2 place_holder'>Publisher: <span className='place_value'>{publisher}</span></span>
            <span className='place_holder mt-1'>Date of publication: <span className='place_value'>{date_publication}</span></span>
            <span className='place_holder mt-1'>ISBN No: <span className='place_value'>{isbn_no}</span></span>
            <span className='place_holder mt-1'>Shelving No: <span className='place_value'>{shelVingNo}</span></span>
            <span className='place_holder mt-1'>No of copies: <span className='place_value'>{noOfCopies}</span></span>
            

            <span className='place_holder mt-2'>Description:

            <span className='description place_value ml-1 font-light'>{details.length > 200 ? details : details + "...."}</span>
            </span>
            {des.length > 30 ? <div onClick={handleMoreDetails} className="more text-blue-700 hover:underline">Read {read} <ExpandMoreOutlinedIcon ref={downRef}/><ExpandLessOutlinedIcon ref={upRef} style={{display:'none'}}/> </div> : null}

            <span className="related_books_heading mt-2 ">Related books</span>
            <div className="related_books flex flex-wrap flex-row mt-4">
              {loading === false?Object.entries(relatedBookList).map(([isbn, book]) => (
                <MediaCard key={isbn} isbn={isbn} book={book} />
            )):<Box sx={{ display: 'flex' }} className="loading_style">
            <CircularProgress />
          </Box>}

            </div>
          </div>
          <div onClick={handleBackButton} className="back_button border h-8 p-1 rounded-full flex justify-center items-center bg-blue-300 border-blue-700 hover:bg-blue-400 cursor-pointer fixed right-8">
            <ArrowBackOutlinedIcon/>
          </div>
        </div>

      </div>
    </>
  )
}
