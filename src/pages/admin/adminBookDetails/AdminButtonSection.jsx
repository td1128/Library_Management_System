import { React, useState, useRef, useDebugValue } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import ModeIcon from '@mui/icons-material/Mode';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DoneAllIcon from '@mui/icons-material/DoneAll';

import { Button as EditButton } from 'react-bootstrap'
import { Modal as EditModal } from 'react-bootstrap'

import './AdminBookDetailsDesign.css'
import { toast } from 'react-toastify';

import { updateSearchBookDetails, updateSearchBookAvailability } from '../../../features/searchBookReducer/SearchBookReducer';
import { setOverlayState } from '../../../features/showOverlayReducer/ShowOverlayReducer';

//Expect the book isbn as props.
export default function AdminButtonSection(props) {
  const apiURL = import.meta.env.VITE_APP_API_URL;
  const dispatch = useDispatch();

  
  const ISBN = props.isbn;
  const searchBookList = useSelector((state) => state.searchBookList.books);
  const book_data = searchBookList[ISBN];

  console.log("book at admin book details section: ",book_data);

  //use state for the plus and minus buttons
  const [isClickEnabled, setIsClickEnabled] = useState(false);
  const [plusBgclass, setPlusBgclass] = useState('bg-grey');
  const [minusBgclass, setMinusBgclass] = useState('bg-grey');


  const [author, setAuthor] = useState(book_data.author_name);
  const [book_title, setBookTitle] = useState(book_data.book.title);
  const [date_publication, setDateOfPublication] = useState(book_data.book.date_of_publication);
  const [publisher, setPublisher] = useState(book_data.book.publisher);
  const [book_description, setBookDescription] = useState(book_data.book.description);
  const [isbn, setIsbn] = useState(book_data.book.isbn);
  const [shelVingNo, setShelVingNo] = useState(book_data.book.shelving_no);
  const [noOfCopies, setNoOfCopies] = useState(book_data.book.no_of_copies);
  const [edition, setEdition] = useState(book_data.book.edition);
  const [cover_image, setCoverImage] = useState(book_data.book.cover_img);
  const [sub_name, setSubName] = useState(book_data.sub_name);

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
  const handleDescriptionChange = (e) => {
    setBookDescription(e.target.value);
    setDetails(e.target.value)
  }
  const handleDateOfPublicationChange = (e) => {
    setDateOfPublication(e.target.value);
  }
  const handleEditionChange = (e) => {
    setEdition(e.target.value);
  }

  //Edit book details modal
  const [show, setShow] = useState(false);

  const handleCloseEdit = () => setShow(false);
  const handleShow = () => setShow(true);
  const editButtonRef = useRef();


  const plusRef = useRef();
  const minusRef = useRef();

  const handleEditBook = () => {
    editButtonRef.current.click();
    console.log("called handle edit book");
  }
  const handleSaveEditDetails = async () => {
    setShow(false);
    dispatch(setOverlayState(true));
    const data = {
      "shelving_no": shelVingNo,
      "isbn": isbn,
      "date_of_publication": date_publication,
      "edition": edition,
      "description": book_description,
      "title": book_title,
      "cover_img": cover_image,
      "author_name": author,
      "sub_name": sub_name
    }

    try {
      toast.info("Request sent to the server.")
      const response = await fetch(`${apiURL}/api/admin/book/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if(response.status === 200){
        toast.success("Book details updated successfully.")
        dispatch(setOverlayState(false));

        const book_details= book_data;
        book_details.book.shelving_no = shelVingNo;
        book_details.book.isbn = isbn;
        book_details.book.date_of_publication = date_publication;
        book_details.book.edition = edition;
        book_details.book.description = book_description;
        book_details.book.title = book_title;
        book_details.book.cover_img = cover_image;
        book_details.author_name = author;
        book_details.sub_name = book_title;
        book_details.book.no_of_copies = noOfCopies;

        dispatch(updateSearchBookDetails(book_details));// TODO check correctness.
      
      }
      else{
        toast.error("Error! updating book details.");
      }
      const json = await response.text()
      console.log(`Response for edit book details, isbn - ${isbn} :  ${json}`);
    } catch (error) {
      console.log('Error while requesing for edit book details: ', error)
      toast.error("Error! updating book details.");
    }
  }

  const handleEditAvailability = () => {
    setIsClickEnabled(true);
    setPlusBgclass('bg-red');
    setMinusBgclass('bg-red');
  }
  const handleSaveAvailability = async () => {
    setIsClickEnabled(false);
    setPlusBgclass('bg-grey');
    setMinusBgclass('bg-grey');
    const data = {
      "isbn": isbn,
      "updatedCount": noOfCopies
    };
    toast.info("Request sent to the server.");
    try {
      const response = await fetch(`${apiURL}/api/admin/book/update-availability`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      if (response.status === 200) {
        toast.success("Book availability updated successfully.")
        dispatch(updateSearchBookAvailability({isbn, noOfCopies}));// TODO check correctness.
      }
      else{
        toast.error("Error! updating book availability.")
      }
      const json = await response.text();
      console.log(`Response for update book availability, isbn - ${isbn} :  ${json}`);
    } catch (error) {
      toast.error("Error! updating book availability.");
      console.log('Error while requesing for update book availability: ', error)
    }
  }

  const handleIncrement = () => {
    if(noOfCopies < 99){
      setNoOfCopies(noOfCopies + 1);
      setPlusBgclass('bg-red');
      setMinusBgclass('bg-red');
    }
    else{
      setPlusBgclass('bg-grey');
    }
  }

  const handleDecrement = () => {
    if(noOfCopies>0){
      setNoOfCopies(noOfCopies - 1);
      setMinusBgclass('bg-red');
      setPlusBgclass('bg-red');
    }
    else{
      setMinusBgclass('bg-grey');
    }
  }

 const handleChangeNoOfCopies = (e)=>{
  setNoOfCopies(e.target.value);
 }

  return (
    <>
      <div>
        <EditButton ref={editButtonRef} variant="primary" onClick={handleShow} className='hidden'>
          Launch demo modal
        </EditButton>

        <EditModal show={show} onHide={handleCloseEdit}>
          <EditModal.Header closeButton>
            <EditModal.Title className='text-red-900 font-bold text-3xl'>Enter new details</EditModal.Title>
          </EditModal.Header>
          <EditModal.Body className='edit_modal_body'>
            <div className="take_input flex flex-row">
              <label htmlFor="shelving_no" className=' text-lg mr-2 font-bold text-red-900'>Shelving No:</label>
              <input id='shelving_no' type="text" className='input_field ' value={shelVingNo} onChange={handleShelvingNoChange} />
            </div>
            <div className="take_input flex flex-row">
              <label htmlFor="title" className=' text-lg mr-2 font-bold text-red-900'>Title:</label>
              <input id='title' type="text" className='input_field ' value={book_title} onChange={handleTitleChange} />
            </div>
            <div className="take_input flex flex-row">
              <label htmlFor="author" className=' text-lg mr-2 font-bold text-red-900'>Author:</label>
              <input id='author' type="text" className='input_field' value={author} onChange={handleAuthorChange} />
            </div>
            {publisher!==undefined? <div className="take_input flex flex-row">
              <label htmlFor="publisher" className=' text-lg mr-2 font-bold text-red-900' >Publisher:</label>
              <input id='publisher' type="text" className='input_field' value={publisher} onChange={handlePublisherChange} />
            </div> :null}

            <div className="take_input flex flex-row">
              <label htmlFor="date" className=' text-lg mr-2 font-bold text-red-900'>Publication:</label>
              <input id='date' type="text" className='input_field' value={date_publication} onChange={handleDateOfPublicationChange} />
            </div>

            <div className="take_input flex flex-row">
              <label htmlFor="edition" className=' text-lg mr-2 font-bold text-red-900'>Edition:</label>
              <input id='edition' type="text" className='input_field' value={edition} onChange={handleEditionChange} />
            </div>
            <div
              className="take_input flex flex-row">
              <label htmlFor="description" className=' text-lg mr-2 font-bold text-red-900'>Description:</label>
              <textarea name="description" id="description" className='input_field w-3/4 h-28 p-1' value={book_description} onChange={handleDescriptionChange}></textarea>
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
      <div className="buttons_section">
        <div className="flex flex-row  items-center">
          <span className='mr-2 text-red-900 font-bold text-lg'>Availability: </span>
          <div className=' w-24 h-8 flex flex-row justify-between items-center'>
            <span ref={minusRef} onClick={isClickEnabled === true ? handleDecrement : null} className={`flex justify-center items-center text-lg font-bold  w-8 h-8 ${minusBgclass}`}>-</span>
            <span className='flex justify-center items-center text-lg font-bold bg-red-200 w-8 h-8'>{noOfCopies}</span>
            {/* <input disabled={!isClickEnabled} onChange={handleChangeNoOfCopies} type="text" max={99} value={noOfCopies} className={`text-lg font-bold  ${isClickEnabled?"bg-red-200":"bg-gray-200"} w-8 h-8`}/> */}
            <span ref={plusRef} onClick={isClickEnabled === true ? handleIncrement : null} className={`flex justify-center items-center text-lg font-bold  w-8 h-8 ${plusBgclass}`}>+</span>
          </div>
          {
            isClickEnabled === false ? <DriveFileRenameOutlineIcon onClick={handleEditAvailability} className=' text-red-900 text-2xl cursor-pointer border-2 border-red-800 ml-2 rounded-sm hover:bg-red-100' /> : <DoneAllIcon onClick={handleSaveAvailability} className=' text-red-900 text-2xl cursor-pointer border-2 border-red-800 ml-2 rounded-sm hover:bg-red-100' />
          }
        </div>
        <button onClick={handleEditBook} className='edit_button bg-red-900 hover:bg-red-800 text-white font-bold p-2 rounded-full mt-3'> Edit book details <ModeIcon className='pen_icon' /></button>

      </div>
    </>
  )
}
