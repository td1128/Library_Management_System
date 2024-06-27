import { React, useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faAngleDown, faAngleUp, faShareNodes, faArrowLeft, faCheck, faXmark, faCircleDot, faCircle, faPenToSquare, faPen } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

//Modal component bootstrap
import { Button as EditButton } from 'react-bootstrap'
import { Modal as EditModal } from 'react-bootstrap'

//Modal component material ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
//Import css
import './AdminBookDetailsDesign.css'

//Import material ui icon;
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

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
export default function AdminBookDetails(props) {
  const dispatch = useDispatch();
  const book = { shelving_no: "sh-2-4", isbn: '978-3-16-148410-1', author: "abcd", title: "Learn C++ online", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, voluptate qui provident fuga mollitia voluptas molestiae magni quidem nobis dicta totam iste animi! Fuga veritatis iure earum ipsum soluta! Molestiae", date_of_publication: "2023", publisher: "Mc Graw Hill", no_of_copies: 1 };


  const isbn_no = "978-3-16-148410-1";//TODO pops.isbn
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

  const [author, setAuthor] = useState(book.author);
  const [book_title, setBookTitle] = useState(book.title);
  const [date_publication, setDateOfPublication] = useState(book.date_of_publication);
  const [publisher, setPublisher] = useState(book.publisher);
  const [book_description, setBookDescription] = useState(book.description);
  const [isbn, setIsbn] = useState(book.isbn);
  const [shelVingNo, setShelVingNo] = useState(book.shelving_no);
  const [noOfCopies, setNoOfCopies] = useState(book.no_of_copies);

  const [details, setDetails] = useState(book_description.substring(0, 150));

  const handleTitleChange = (e) => {
    setBookTitle(e.target.value);
  }
  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  }
  const handlePublisherChange = (e) => {
    setPublisher(e.target.value);
  }
  const handleIsbnChange = (e) => {
    setIsbn(e.target.value);
  }
  const handleDescriptionChange = (e) => {
    setBookDescription(e.target.value);
    setDetails(e.taret.value)
    console.log("des: ", book_description);
  }
  const handleDateOfPublicationChange = (e) => {
    setDateOfPublication(e.target.value);
    console.log("date: ", date_publication);
  }


  const [availability, setAvailability] = useState(avl);
  setTimeout(() => {
    setAvailability(false);
  }, 5000);


  //Edit book details modal
  const [show, setShow] = useState(false);

  const handleCloseEdit = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const upRef = useRef();
  const downRef = useRef();
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

  const handleBackButton = () => {
    navigate(-1);
  }

  const handleEditBook = () => {
    editButtonRef.current.click();
    console.log("called handle edit book");
  }
  const handleSaveEditDetails = () => {
    setShow(false);
    console.log("called handle save edit details");
     
 	//put request body
// {
//   "shelving_no": "sh-0-5",
//   "isbn": "123-1-12755-028-0",
//   "date_of_publication": "18-09-2010",
//   "edition": 6,
//   "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac tellus eget tortor commodo condimentum a ac odio",
//   "title": "myBook2",
//   "cover_img": "https://www.pngkey.com/png/detail/350-3500680_placeholder-open-book-silhouette-vector.png",
// "author_name" : "Abir",
//   "sub_name" : "Science"
// }
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
              <input id='title' type="text" className='input_field ' value={book_title} onChange={handleTitleChange} />
            </div>
            <div className="take_input flex flex-row">
              <label htmlFor="author" className=' text-lg mr-2'>Author:</label>
              <input id='author' type="text" className='input_field' value={author} onChange={handleAuthorChange} />
            </div>
            <div className="take_input flex flex-row">
              <label htmlFor="publisher" className=' text-lg mr-2' >Publisher:</label>
              <input id='publisher' type="text" className='input_field' value={publisher} onChange={handlePublisherChange} />
            </div>

            <div className="take_input flex flex-row">
              <label htmlFor="date" className=' text-lg mr-2'>Date of publication:</label>
              <input id='date' type="text" className='input_field' value={date_publication} onChange={handleDateOfPublicationChange} />
            </div>

            <div className="take_input flex flex-row">
              <label htmlFor="isbn" className=' text-lg mr-2'>ISBN:</label>
              <input id='isbn' type="text" className='input_field' value={isbn} onChange={handleIsbnChange} />
            </div>
            <div
              className="take_input flex flex-row">
              <label htmlFor="description" className=' text-lg mr-2'>Description:</label>
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


      </div>

      <div className="container">
        {/* <div className="navbar">This is navbar</div> */}

        <div className="book_section">
          <div className="book_image">
            <img src="/book_img2.png" alt="Loading image!" className='image shadow-lg border border-blue-700 ' />
          </div>
          <div className="buttons_section">
            <button onClick={handleEditBook} className='edit_button bg-red-900 hover:bg-red-800 text-white font-bold p-2 rounded-full'><FontAwesomeIcon className='pen_icon' icon={faPen} /> Edit book details</button>

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
            
          </div>
          <div onClick={handleBackButton} className="back_button border h-8 p-1 rounded-full flex justify-center items-center bg-blue-300 border-blue-700 hover:bg-blue-400 cursor-pointer fixed right-8">
            <ArrowBackOutlinedIcon/>
          </div>
        </div>

      </div>
    </>
  )
}
