import { React, useState, useRef, useEffect } from 'react'
import '../../pages/user/bookDetails/BookDetailsDesign.css'
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { fetchRelatedBookList } from '../../features/relatedBoolReducer/RelatedBookReducer';
import { fetchSearchQueryResult } from '../../features/searchBookReducer/SearchBookReducer';

//Material ui icons
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

// import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';


//Common components
import UserButtonSection from '../../pages/user/bookDetails/UserButtonSection';
import AdminButtonSection from '../../pages/admin/adminBookDetails/AdminButtonSection';
import RelatedBookSection from '../../pages/user/bookDetails/RelatedBookSection';

import Footer from '../footer/Footer';

//This component accepts the book as props.
export default function ShowBookDetails(props) {
  //TODO props.book
  const dummy_book = { shelving_no: "sh-2-4", isbn: '978-0-07-140194-4', author: "Sanjay Saha", title: "Data base management system", description: "Animesh ipsum dolor sit amet consectetur adipisicing elit. Maiores, modi veniam nostrum repudiandae officia dolorum sit aliquid asperiores nemo necessitatibus nam eaque voluptatibus blanditiis voluptatem vero eius accusamus velit vitae quos tempore! Autem temporibus dolor expedita earum enim, ullam suscipit voluptate hic aliquid vitae dignissimos officiis accusamus quas, velit veritatis.", dateOfPublication: "2020", publisher: "Mc Graw Hill", no_of_copies: 1 };
  const dispatch = useDispatch();
  const params = useParams();
  // console.log("header isbn: ",params.isbn);
  const apiURL = import.meta.env.VITE_APP_API_URL;
  // console.log("Api url: ",apiURL);

  const [book, setBook] = useState(props.book);
  const [loading, setLoading] = useState(true);


  const isbn_no = "978-0-07-140194-4";//TODO pops.book.isbn
  // const isbn_no = props.book.isbn;
  useEffect(() => {
    const fetchBook = async (isbn) => {
      try {
        const response = await fetch(`${apiURL}/api/common/book/isbn/${isbn}`
        );
        if (response.status === 200) {
          const data = await response.json();
          data.book.author = data.author_name;
          setBook(data.book);
          setDetails(data.book.description.substring(0, 150));
          setLoading(false);
        }
      }
      catch (error) {
        console.log("Error while fetching book by isbn, ", error);
      }
    }


    if (params.isbn !== undefined && loading === true && props.book === undefined) {
      fetchBook(params.isbn);
    }
    if (props.type === 'user' && loading === false) {
      dispatch(fetchRelatedBookList(isbn_no));
    }
  }, [dispatch, params, loading])

  if (params.isbn === undefined) {
    setBook(props.book);
    // console.log("Entered");
  }

  console.log("book: ", book);

  //Book details
  // const shelVingNo = book.shelving_no;
  // const author = book.author;
  // const book_title = book.title;
  // const date_publication = book.date_of_publication;
  const des = book !== undefined ? book.description : "dummy description";

  // const publisher = book.publisher;
  // const noOfCopies = book.no_of_copies;

  // console.log("des: ",des);
  const navigate = useNavigate();

  //Used for showing up/down arrow at read more section
  const upRef = useRef();
  const downRef = useRef();

  const description_length = 150;
  const [details, setDetails] = useState(des.substring(0, description_length));
  const [read, setRead] = useState("More");

  const handleMoreDetails = () => {
    details == des ? setDetails(des.substring(0, 150)) : setDetails(des);
    read == "More" ? setRead("Less") : setRead("More");

    upRef.current.style.display == "none" ? upRef.current.style.display = "inline" : upRef.current.style.display = "none";
    downRef.current.style.display == "none" ? downRef.current.style.display = "inline" : downRef.current.style.display = "none";
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
            <div className="book_image">
              <img src="/book_img2.png" alt="Loading image!" className='image shadow-lg border border-blue-700 ' />
            </div>
            {
              props.type === 'user' ? <UserButtonSection isbn={book.isbn} /> : <AdminButtonSection book={book} />
            }
          </div>

          <div className="book_details_section">
            <div className="book_features">

              <span className="book_title">{book.title} <span className={`noOfCopies ${book.no_of_copies > 0 ? 'in_stock' : 'out_stock'}`}>{book.no_of_copies > 0 ? "In Stock" : "Out of Stock"}</span></span>

              <span className='author'>by  {book.author}</span>


              <span className='place_holder mt-1'>Shelving No: <span className='place_value'>{book.shelving_no}</span></span>

              <span className='place_holder mt-1'>ISBN No: <span className='place_value'>{book.isbn}</span></span>

              <span className='place_holder mt-1'>Date of publication: <span className='place_value'>{book.date_of_publication}</span></span>

              {book.publisher && <span className='mt-2 place_holder'>Publisher: <span className='place_value'>{book.publisher}</span></span>}

              {/* <span className='place_holder mt-1'>No of copies: <span className='place_value'>{book.no_of_copies}</span></span> */}

              <span className='place_holder mt-2'>Description:
                <span className='description place_value ml-1 font-light'>{details.length === description_length ? details + "...." : details}</span>
              </span>
              {des.length > description_length ? <div onClick={handleMoreDetails} className="more text-blue-700 hover:underline">Read {read} <ExpandMoreOutlinedIcon ref={downRef} /><ExpandLessOutlinedIcon ref={upRef} style={{ display: 'none' }} /> </div> : null}

              {/* Related Books Section */}
              {props.type === 'user' && loading === false ? <RelatedBookSection /> : null}
            </div>
            <div onClick={handleBackButton} className="back_button border h-8 p-1 rounded-full flex justify-center items-center bg-blue-300 border-blue-700 hover:bg-blue-400 cursor-pointer fixed right-8">
              <ArrowBackOutlinedIcon />
            </div>
          </div>
        </div> : null}
        {loading === false?<Footer/>:null}
    </>
  )
}
