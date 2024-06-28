import { React, useState, useRef, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

//Modal component bootstrap
import { Button as EditButton } from 'react-bootstrap'
import { Modal as EditModal } from 'react-bootstrap'

//Import css
import './AdminBookDetailsDesign.css'

//Import material ui icon;
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ModeIcon from '@mui/icons-material/Mode';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DoneAllIcon from '@mui/icons-material/DoneAll';

//This component accepts ISBN no of the book as props.
export default function AdminBookDetails(props) {
  const dispatch = useDispatch();
  const apiURL= import.meta.env.VITE_APP_API_URL;

  
  const book = { shelving_no: "sh-2-4", isbn: '978-0-19-852663-6', cover_img: "https://www.pngkey.com/png/detail/350-3500680_placeholder-open-book-silhouette-vector.png", author: "abcd", title: "Learn C++ online", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, voluptate qui provident fuga mollitia voluptas molestiae magni quidem nobis dicta totam iste animi! Fuga veritatis iure earum ipsum soluta! Molestiae", date_of_publication: "2023", publisher: "Mc Graw Hill", no_of_copies: 10, edition:6 };//TODO props.book

  //Book details
  const des = book.description;
  const avl = book.availability;

  //use state for the plus and minus buttons
  const [isClickEnabled, setIsClickEnabled] = useState(false);
  const [bgclass, setBgclass] = useState('bg-grey')


  const [author, setAuthor] = useState(book.author);
  const [book_title, setBookTitle] = useState(book.title);
  const [date_publication, setDateOfPublication] = useState(book.date_of_publication);
  const [publisher, setPublisher] = useState(book.publisher);
  const [book_description, setBookDescription] = useState(book.description);
  const [isbn, setIsbn] = useState(book.isbn);
  const [shelVingNo, setShelVingNo] = useState(book.shelving_no);
  const [noOfCopies, setNoOfCopies] = useState(book.no_of_copies);
  const [edition, setEdition] = useState(book.edition);
  const [cover_image, setCoverImage] = useState(book.cover_img);

  const [details, setDetails] = useState(book_description.substring(0, 150));

  const handleShelvingNoChange = (e) => {
    setShelVingNo(e.target.value);
  }
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
  }
  const handleDateOfPublicationChange = (e) => {
    setDateOfPublication(e.target.value);
  }
  const handleEditionChange = (e)=>{
    setEdition(e.target.value);
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


  const plusRef = useRef();
  const minusRef = useRef();

  const [read, setRead] = useState("More");

  const handleMoreDetails = () => {
    details == book_description ? setDetails(book_description.substring(0, 150)) : setDetails(book_description);
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
  const handleSaveEditDetails = async() => {
    setShow(false);
    const data = {
      "shelving_no": shelVingNo,
      "isbn": isbn,
      "date_of_publication": date_publication,
      "edition": edition,
      "description": book_description,
      "title": book_title,
      "cover_img": cover_image,
      "author_name" : author,
      "sub_name" : book_title
    }

    try {
      const response = await fetch(`${apiURL}/api/admin/book/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      const json = await response.text()
      console.log(`Response for edit book details, isbn - ${isbn} :  ${json}`);
    } catch (error) {
      console.log('Error while requesing for edit book details: ', error)
    }
  }

  const handleEditAvailability = ()=>{
    setIsClickEnabled(true);
    setBgclass('bg-red')
  }
  const handleSaveAvailability = async()=>{//Api respond with status code 500
    setIsClickEnabled(false);
    setBgclass('bg-grey');
    try {
      const response = await fetch(`${apiURL}/api/admin/book/update-availability?updated-count=${noOfCopies}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "isbn":{isbn}
        })
      });
      if(response.status === 200){
        //TODO dispatch(action)
      }
      const json = response.json();
      console.log(`Response for update book availability, isbn - ${isbn} :  ${json}`);
    } catch (error) {
      console.log('Error while requesing for update book availability: ', error)
    }
  }

  const handleIncrement= ()=>{
    setNoOfCopies(noOfCopies+1);
  }

  const handleDecrement = ()=>{
    setNoOfCopies(noOfCopies-1);
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
              <label htmlFor="shelving_no" className=' text-lg mr-2'>Shelving No:</label>
              <input id='shelving_no' type="text" className='input_field ' value={shelVingNo} onChange={handleShelvingNoChange} />
            </div>
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
              <label htmlFor="edition" className=' text-lg mr-2'>Edition:</label>
              <input id='edition' type="text" className='input_field' value={edition} onChange={handleEditionChange} />
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
        <div className="book_section">
          <div className="book_image">
            <img src="/book_img2.png" alt="Loading image!" className='image shadow-lg border border-blue-700 ' />
          </div>
          <div className="buttons_section">
            <div className="flex flex-row  items-center">
              <span className='mr-2 text-red-900 font-bold text-lg'>Availability: </span>
              <div className=' w-24 h-8 flex flex-row justify-between items-center'>
                <span ref={minusRef} onClick={isClickEnabled===true?handleDecrement:null} className={`flex justify-center items-center text-lg font-bold  w-8 h-8 ${bgclass}`}>-</span>
                <span className='flex justify-center items-center text-lg font-bold bg-red-200 w-8 h-8'>{noOfCopies}</span>
                <span ref={plusRef} onClick={isClickEnabled===true?handleIncrement:null} className={`flex justify-center items-center text-lg font-bold  w-8 h-8 ${bgclass}`}>+</span>
              </div>
              {
                isClickEnabled===false?<DriveFileRenameOutlineIcon onClick={handleEditAvailability} className=' text-red-900 text-2xl cursor-pointer border-2 border-red-800 ml-2 rounded-sm hover:bg-red-100'/>:<DoneAllIcon onClick={handleSaveAvailability} className=' text-red-900 text-2xl cursor-pointer border-2 border-red-800 ml-2 rounded-sm hover:bg-red-100'/>
              }
            </div>
            <button onClick={handleEditBook} className='edit_button bg-red-900 hover:bg-red-800 text-white font-bold p-2 rounded-full mt-3'> Edit book details <ModeIcon className='pen_icon'/></button>

          </div>
        </div>


        <div className="book_details_section">
          <div className="book_features">

            <span className="book_title">{book_title} <span className={`noOfCopies ${noOfCopies > 0 ? 'in_stock' : 'out_stock'}`}>{noOfCopies > 0 ? "In Stock" : "Out of Stock"}</span></span>

            <span className='author'>by  {author}</span>

            <span className='mt-2 place_holder'>Publisher: <span className='place_value'>{publisher}</span></span>
            <span className='place_holder mt-1'>Date of publication: <span className='place_value'>{date_publication}</span></span>
            <span className='place_holder mt-1'>ISBN No: <span className='place_value'>{isbn}</span></span>
            <span className='place_holder mt-1'>Shelving No: <span className='place_value'>{shelVingNo}</span></span>


            <span className='place_holder mt-2'>Description:

              <span className='description place_value ml-1 font-light'>{details.length > 200 ? details : details + "...."}</span>
            </span>
            {des.length > 30 ? <div onClick={handleMoreDetails} className="more text-blue-700 hover:underline">Read {read} <ExpandMoreOutlinedIcon ref={downRef} /><ExpandLessOutlinedIcon ref={upRef} style={{ display: 'none' }} /> </div> : null}

          </div>
          <div onClick={handleBackButton} className="back_button border h-8 p-1 rounded-full flex justify-center items-center bg-blue-300 border-blue-700 hover:bg-blue-400 cursor-pointer fixed right-8">
            <ArrowBackOutlinedIcon />
          </div>
        </div>

      </div>
    </>
  )
}
