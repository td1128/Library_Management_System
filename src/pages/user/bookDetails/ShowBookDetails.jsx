import { React, useState, useRef, useEffect } from 'react'
import './BookDetailsDesign.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faAngleDown, faAngleUp, faShareNodes, faArrowLeft, faCheck, faXmark, faCircleDot, faCircle } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchRelatedBookList } from '../../../features/relatedBoolReducer/RelatedBookReducer';

//Modal component material ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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
  }, [isbn_no])

  //Getting book list from book list state
  const relatedBookList = useSelector((state) => state.relatedBookList.books);
  console.log("Related books : ", relatedBookList);

  // const book = bookList[isbn_no];//TODO props.book
  const book = { isbn: '978-3-16-148410-1', author: "abcd", title: "Learn C++ online", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, voluptate qui provident fuga mollitia voluptas molestiae magni quidem nobis dicta totam iste animi! Fuga veritatis iure earum ipsum soluta! Molestiae", dateOfPublication: "2023", publisher: "Mc Graw Hill", availability: true };

  //Book details
  const author = book.author;
  const book_title = book.title;
  const date_publication = book.dateOfPublication;
  const des = book.description;
  const publisher = book.publisher;
  const avl = book.availability;

  const [availability, setAvailability] = useState(avl);
  setTimeout(() => {
    setAvailability(false);
  }, 5000);

  const currentPage = "https://images.app.goo.gl/Nzg1kKwumfDiR3qB8";
  const title = 'Check out this amazing book ';
  const description = 'Animesh share a book with you.';

  // const book_list = ["ajflajf", "jfaoj", "kfjajo", "fjajofj", "kjfjoj", "kafo;j", "kafjofj", "lkjfjjf"];

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const upRef = useRef();
  const downRef = useRef();
  const heartRef = useRef();
  const shareRef = useRef();

  // const cd = ["abc","cddd","dkj","knf","klfjaoj","kfaoj",";lkjfja","kofajf"];

  const [details, setDetails] = useState(des.substring(0, 150));
  const [read, setRead] = useState("More");

  const handleMoreDetails = () => {
    details == des ? setDetails(des.substring(0, 150)) : setDetails(des);
    read == "More" ? setRead("Less") : setRead("More");

    upRef.current.style.display == "none" ? upRef.current.style.display = "inline" : upRef.current.style.display = "none";
    downRef.current.style.display == "none" ? downRef.current.style.display = "inline" : downRef.current.style.display = "none";
  }

  const handleAddtoWishlist = async () => {
    heartRef.current.style.color = 'rgb(241, 134, 134)';
    const apiURL = import.meta.env.VITE_APP_API_URL
    // console.log("api url: ", apiURL);
    const memberId = 28;//TODO 
    const data = { "sub_name": `${book_title}` };
    try {
      const response = await fetch(`${apiURL}/api/user/profile/add/fav-sub/${memberId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Convert the data object to a JSON string
      });
      const json = await response.json()
      console.log("Response for add to favorite books : ", json);
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
              <EmailShareButton quote={`${title} ${description}`}
                hashtag="#example" url={currentPage}>
                <EmailIcon size={40} round={true} />
              </EmailShareButton>

              <WhatsappShareButton title={title} descriptionWrapper={description}
                hashtag="#share" url={currentPage} style={{ marginLeft: '8px' }}>
                <WhatsappIcon size={40} round={true} />
              </WhatsappShareButton>

              <FacebookShareButton url={currentPage} style={{ marginLeft: '8px' }}>
                <FacebookIcon size={40} round={true} />
              </FacebookShareButton>

              <LinkedinShareButton url={currentPage} style={{ marginLeft: '8px' }}>
                <LinkedinIcon size={40} round={true} />
              </LinkedinShareButton>

              <TelegramShareButton url={currentPage} style={{ marginLeft: '8px' }}>
                <TelegramIcon size={40} round={true} />
              </TelegramShareButton>

              <TwitterShareButton url={currentPage} style={{ marginLeft: '8px' }}>
                <XIcon size={40} round={true} />
              </TwitterShareButton>
            </Typography>
          </Box>
        </Modal>
      </div>

      <div className="container">
        {/* <div className="navbar">This is navbar</div> */}

        <div className="book_section">
          <div className="book_image">
            <img src="/book_img2.png" alt="Loading image!" className='image shadow-lg border border-blue-700 ' />
          </div>
          <div className="buttons_section">
            <button onClick={handleAddtoWishlist} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full hover:text-red-300"><FontAwesomeIcon ref={heartRef} icon={faHeart} className='icon mr-1' />Add to wish list</button>
            <div onClick={handleShare} className="share_hover bg-blue-100 ml-4 mt-1 inline-block border border-blue-700 p-2 rounded-full hover:cursor-pointer hover:bg-blue-500">
              <FontAwesomeIcon icon={faShareNodes} className='share_icon share_hover' />
            </div>
          </div>
        </div>


        <div className="book_details_section">
          <div className="book_features">

            {/* <FontAwesomeIcon className='  text-red-500 h-5 w-5 mb-3' icon={faCircleDot} /> */}

            <span className="book_title">{book_title}<FontAwesomeIcon className=' text-green-500 h-3 w-3 mb-4 ' icon={faCircle} /></span>
            <span className='author'>by  {author}</span>
            <span className='description'>{details.length > 200 ? details : details + "...."}</span>
            {des.length > 30 ? <div onClick={handleMoreDetails} className="more text-blue-700 hover:underline">Read {read} <FontAwesomeIcon ref={downRef} icon={faAngleDown} /><FontAwesomeIcon style={{ display: "none" }} ref={upRef} icon={faAngleUp} /></div> : null}

            <span className='mt-2 heading'>Publisher: <span className='value'>{publisher}</span></span>
            <span className='heading'>Date of publication: <span className='value'>{date_publication}</span></span>
            <span className='heading'>ISBN No: <span className='value'>{isbn_no}</span></span>
            <span className='heading'>Availability: {availability ? <FontAwesomeIcon className=' text-green-500' icon={faCheck} /> : <FontAwesomeIcon className=' text-red-600' icon={faXmark} />}</span>
            <span className="related_books text-amber-700 mt-2 ">Related books</span>
            <div className="related_books flex flex-wrap flex-row">
              {Object.entries(relatedBookList).map(([isbn, book]) => (
                <MediaCard key={isbn} isbn={isbn} book={book} />
              ))}

            </div>
          </div>
          <div onClick={handleBackButton} className="back_button border h-8 p-2 rounded-full flex justify-center bg-blue-300 border-blue-700 hover:bg-blue-400 cursor-pointer fixed right-8">
            <FontAwesomeIcon icon={faArrowLeft} className='' />
          </div>
        </div>

      </div>
    </>
  )
}
