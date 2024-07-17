import { React, useState, useRef, useEffect } from 'react'
import '../../pages/user/bookDetails/BookDetailsDesign.css'
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { fetchRelatedBookList } from '../../features/relatedBoolReducer/RelatedBookReducer';

//Material ui icons
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

// import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


//Common components
import UserButtonSection from '../../pages/user/bookDetails/UserButtonSection';
import AdminButtonSection from '../../pages/admin/adminBookDetails/AdminButtonSection';
import RelatedBookSection from '../../pages/user/bookDetails/RelatedBookSection';

import Footer from '../footer/Footer';

//This component accepts the book as props.
export default function ShowBookDetails(props) {
  const dispatch = useDispatch();
  const {isbn} = useParams();


  const apiURL = import.meta.env.VITE_APP_API_URL;

  const [book, setBook] = useState(undefined); //Initially book will be undefined, if changed to null then gives error as we are reading book.book.description
  const [loading, setLoading] = useState(true);

  const description_length = 50;//Describe description length to be shown in frontend.

  useEffect(() => {
    console.log("isbn changed: ",isbn);
    const fetchBook = async (isbn) => {
      try {
        const response = await fetch(`${apiURL}/api/common/book/isbn/${isbn}`
        );
        if (response.status === 200) {
          const data = await response.json();
          setBook(data);
          setDetails(data.book.description.substring(0, description_length));
          setLoading(false);
        }
      }
      catch (error) {
        console.log("Error while fetching book by isbn, ", error);
      }
    }

    setLoading(true);
    fetchBook(isbn);
    if (props.type === 'user' ) {
      dispatch(fetchRelatedBookList(isbn));
    }
  }, [isbn])

  if (isbn === undefined) {
    setBook(props.book);
  }

  const book_description = book!== undefined?book.book.description:""; // temporarily storing book description.
  const navigate = useNavigate();

  //Used for showing up/down arrow at read more section
  const upRef = useRef();
  const downRef = useRef();

  const [details, setDetails] = useState(book_description.substring(0, description_length));
  const [read, setRead] = useState("More");

  const handleMoreDetails = () => {
    details === book_description ? setDetails(book_description.substring(0, description_length)) : setDetails(book_description);
    read === "More" ? setRead("Less") : setRead("More");

    upRef.current.style.display === "none" ? upRef.current.style.display = "inline" : upRef.current.style.display = "none";
    downRef.current.style.display === "none" ? downRef.current.style.display = "inline" : downRef.current.style.display = "none";
  }

  const handleBackButton = () => {
    navigate(-1);
  }

  return (
    <>
      <div>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      </div>

        {loading === false ? <div className={`container `}>
          <div className="book_section">
            <div className={`book_image book-card ${book.book.no_of_copies ===0? 'out-of-stock':''}`}>
              <img src={book.book.cover_img} alt="Loading image!" className='image shadow-lg border border-blue-700 ' />
            </div>
            {
              props.type === 'user' ? <UserButtonSection no_of_copies={book.book.no_of_copies} book={book} /> : <AdminButtonSection book={book} isbn= {book.book.isbn}/>
            }
          </div>

          <div className="book_details_section">
            <div className="book_features">

              <span className="book_title">{book.book.title} <span className={`noOfCopies ${book.book.no_of_copies > 0 ? 'in_stock' : 'out_stock'}`}>{book.book.no_of_copies > 0 ? "In Stock" : "Out of Stock"}</span></span>

              <span className='author'>by  {book.author_name}</span>


              <span className='place_holder mt-1'>Shelving No: <span className='place_value'>{book.book.shelving_no}</span></span>

              <span className='place_holder mt-1'>ISBN No: <span className='place_value'>{book.book.isbn}</span></span>

              <span className='place_holder mt-1'>Date of publication: <span className='place_value'>{book.book.date_of_publication}</span></span>

              {book.book.publisher && <span className='mt-2 place_holder'>Publisher: <span className='place_value'>{book.book.publisher}</span></span>}

              <span className='place_holder mt-2'>Description:
                <span className='description place_value ml-1 font-light'>{details !== book_description ? details + "...." : details}</span>
              </span>
              {book_description.length > description_length ? <div onClick={handleMoreDetails} className="more text-blue-700 hover:underline">Read {read} <ExpandMoreOutlinedIcon ref={downRef} /><ExpandLessOutlinedIcon ref={upRef} style={{ display: 'none' }} /> </div> : null}

              {/* Related Books Section */}
              {props.type === 'user'  ? <RelatedBookSection /> : null}
            </div>
            <div onClick={handleBackButton} className="back_button border h-8 p-1 rounded-full flex justify-center items-center bg-red-900 border-red-900 hover:bg-red-800 cursor-pointer fixed right-8">
              <ArrowBackOutlinedIcon className='text-white'/>
            </div>
          </div>
        </div> : null}
        {loading === false?<Footer/>:null}
    </>
  )
}
