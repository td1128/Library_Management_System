import { React, useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faAngleDown, faAngleUp, faShareNodes, faArrowLeft, faCheck, faXmark, faCircleDot, faCircle, faPenToSquare, faPen } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

//Modal component bootstrap
import {Button as EditButton} from 'react-bootstrap'
import {Modal as EditModal} from 'react-bootstrap'

//Modal component material ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
//Import css
import './AdminBookDetailsDesign.css'
//Card component
import MediaCard from '../../user/bookDetails/card_body';

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

import { fetchRelatedBookList } from '../../../features/relatedBoolReducer/RelatedBookReducer';

//This component accepts ISBN no of the book as props.
export default function AdminBookDetails(props) {
    const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(fetchBookList(queryRef.current, availability, sortBy))
    //   }, [dispatch, availability, sortBy])
    // useEffect(() => {
    //   first
    
    //   return () => {
    //     second
    //   }
    // }, [third])
    
  const isbn_no = "978-3-16-148410-1";//TODO pops.isbn
  //Getting book list from book list state
  const bookList = useSelector((state) => state.relatedBookList.books);
  const book = bookList[isbn_no]
  // console.log("book: ",book);
  // console.log("book list: ",bookList);

  //Book details
//   const author = book.author;
//   const book_title = book.title;
//   const date_publication = book.dateOfPublication;
  const des = book.description;
  // const des = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni eligendi, neque nemo labore autem error aliquam officiis corporis commodi earum nisi saepe dolores voluptatum quo non impedit perferendis harum dignissimos";
//   const publisher = book.publisher;
  const avl = book.availability;

  const [author,setAuthor] = useState(book.author);
  const [book_title, setBookTitle] = useState(book.title);
  const [date_publication, setDateOfPublication] = useState(book.dateOfPublication);
  const [publisher, setPublisher] = useState(book.publisher);
  const [book_description, setBookDescription] = useState(book.description);
  const [isbn, setIsbn] = useState(book.isbn);

  const [details, setDetails] = useState(book_description.substring(0, 150));

  const handleTitleChange = (e)=>{
    setBookTitle(e.target.value);
  }
  const handleAuthorChange = (e)=>{
    setAuthor(e.target.value);
  }
  const handlePublisherChange = (e)=>{
      setPublisher(e.target.value);
  }
  const handleIsbnChange = (e)=>{
    setIsbn(e.target.value);
  }
  const handleDescriptionChange = (e)=>{
    setBookDescription(e.target.value);
    setDetails(e.taret.value)
    console.log("des: ",book_description);
  }
  const handleDateOfPublicationChange = (e)=>{
    setDateOfPublication(e.target.value);
    console.log("date: ",date_publication);
  }

  
  const [availability,setAvailability] = useState(avl);
  setTimeout(() => {
    setAvailability(false);
  }, 5000);

  const currentPage = "https://images.app.goo.gl/Nzg1kKwumfDiR3qB8";
  const title = 'Check out this amazing book ';
  const description = 'Animesh share a book with you.';

  const book_list = ["ajflajf", "jfaoj", "kfjajo","fjajofj", "kjfjoj", "kafo;j", "kafjofj", "lkjfjjf"];

  //Share modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //Edit book details modal
  const [show, setShow] = useState(false);

  const handleCloseEdit = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const upRef = useRef();
  const downRef = useRef();
  const heartRef = useRef();
  const shareRef = useRef();
  const editButtonRef = useRef();

  // const cd = ["abc","cddd","dkj","knf","klfjaoj","kfaoj",";lkjfja","kofajf"];

  const [read, setRead] = useState("More");

  const handleMoreDetails = () => {
    details == book_description ? setDetails(book_description.substring(0, 150)) : setDetails(book_description);
    // book_description.length<250 ? setDetails(des.substring(0, 150)) : setDetails(des);
    read == "More" ? setRead("Less") : setRead("More");

    upRef.current.style.display == "none" ? upRef.current.style.display = "inline" : upRef.current.style.display = "none";
    downRef.current.style.display == "none" ? downRef.current.style.display = "inline" : downRef.current.style.display = "none";
  }

  const handleAddtoWishlist = () => {
    heartRef.current.style.color = 'rgb(241, 134, 134)';
  }
  const handleShare = () => {
    shareRef.current.click();
  }

  const handleBackButton = () => {
    navigate(-1);
  }

  const handleEditBook = ()=>{
    editButtonRef.current.click();
    console.log("called handle edit book");
  }
  const handleSaveEditDetails = ()=>{
    setShow(false);
    console.log("called handle save edit details");
  }

  return (
    <>
      <div>
      <EditButton ref={editButtonRef} variant="primary" onClick={handleShow} className='hidden'>
        Launch demo modal
      </EditButton>

      <EditModal show={show} onHide={handleCloseEdit}>
        <EditModal.Header closeButton>
          <EditModal.Title>Enter new details</EditModal.Title>
        </EditModal.Header>
        <EditModal.Body className='edit_modal_body'>
            <div className="take_input flex flex-row">
            <label htmlFor="title" className=' text-lg mr-2'>Title:</label>
            <input id='title' type="text" className='input_field ' value={book_title} onChange={handleTitleChange}/>
            </div>
            <div className="take_input flex flex-row">
            <label htmlFor="author" className=' text-lg mr-2'>Author:</label>
            <input id='author' type="text" className='input_field' value={author} onChange={handleAuthorChange}/>
            </div>
            <div className="take_input flex flex-row">
            <label htmlFor="publisher"className=' text-lg mr-2' >Publisher:</label>
            <input id='publisher' type="text" className='input_field' value={publisher} onChange={handlePublisherChange}/>
            </div>

            <div className="take_input flex flex-row">
            <label htmlFor="date"className=' text-lg mr-2'>Date of publication:</label>
            <input id='date' type="text" className='input_field' value={date_publication} onChange={handleDateOfPublicationChange}/>
            </div>
            
            <div className="take_input flex flex-row">
            <label htmlFor="isbn"className=' text-lg mr-2'>ISBN:</label>
            <input id='isbn' type="text" className='input_field' value={isbn} onChange={handleIsbnChange}/>
            </div>
            <div
             className="take_input flex flex-row">
            <label htmlFor="description"className=' text-lg mr-2'>Description:</label>
            <textarea name="description" id="description" className='input_field w-3/4 h-28' value={book_description} onChange={handleDescriptionChange}></textarea>
            </div>
        </EditModal.Body>
        <EditModal.Footer>
          <EditButton variant="secondary" onClick={handleCloseEdit}>
            Cancel
          </EditButton>
          <EditButton variant="primary" onClick={handleSaveEditDetails}>
            Save Changes
          </EditButton>
        </EditModal.Footer>
      </EditModal>

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
            <span className='description'>{details.length > 200 ? details : details + "...."} </span>
            {/* <span className='description'>{book_description.length <= 200 ? book_description : (book_description + "....")} </span> */}
            {des.length > 30 ? <div onClick={handleMoreDetails} className="more text-blue-700 hover:underline">Read {read} <FontAwesomeIcon ref={downRef} icon={faAngleDown} /><FontAwesomeIcon style={{ display: "none" }} ref={upRef} icon={faAngleUp} /></div> : null}
            
            <span className='mt-2 heading'>Publisher: <span className='value'>{publisher}</span></span>
            <span className='heading'>Date of publication: <span className='value'>{date_publication}</span> </span>
            <span className='heading'>ISBN No: <span className='value'>{isbn}</span></span>
            <span className='heading'>Availability: {availability?<FontAwesomeIcon className=' text-green-500' icon={faCheck} />:<FontAwesomeIcon className=' text-red-600' icon={faXmark} />}</span>
            
            <button onClick={handleEditBook} className='edit_button bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded'><FontAwesomeIcon className='pen_icon' icon={faPen} /> Edit book details</button>
          <span className="related_books text-amber-700 mt-2 ">Related books</span>
          <div className="related_books flex flex-wrap flex-row">
            {
              book_list.map((e,id)=>{
                return <MediaCard key={id}/>
              })
            }
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
