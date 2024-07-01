import { React, useState, useRef, useEffect } from 'react'
import '../../pages/user/bookDetails/BookDetailsDesign.css'
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { fetchRelatedBookList } from '../../features/relatedBoolReducer/RelatedBookReducer';

//Material ui icons
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

//Common components
import UserButtonSection from '../../pages/user/bookDetails/UserButtonSection';
import AdminButtonSection from '../../pages/admin/adminBookDetails/AdminButtonSection';
import RelatedBookSection from '../../pages/user/bookDetails/RelatedBookSection';

//This component accepts the book as props.
export default function ShowBookDetails(props) {
  const isbn_no = "978-0-07-140194-4";//TODO pops.book.isbn
  // const isbn_no = props.book.isbn;
  const dispatch = useDispatch();

  const params = useParams();
  const isbn = params.isbn;
  console.log("isbn: ",isbn);

  useEffect(() => {
    if (props.type === 'user') {
      dispatch(fetchRelatedBookList(isbn_no));
    }
  }, [dispatch])

  //TODO props.book
  const book = { shelving_no: "sh-2-4", isbn: '978-0-07-140194-4', author: "abcd", title: "Learn C++ online", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, voluptate qui provident fuga mollitia voluptas molestiae magni quidem nobis dicta totam iste animi! Fuga veritatis iure earum ipsum soluta! Molestiae", dateOfPublication: "2023", publisher: "Mc Graw Hill", no_of_copies: 1 };
  // const book = props.book;

  //Book details
  const shelVingNo = book.shelving_no;
  const author = book.author;
  const book_title = book.title;
  const date_publication = book.dateOfPublication;
  const des = book.description;
  const publisher = book.publisher;
  const noOfCopies = book.no_of_copies;

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
      <div className="container">
        <div className="book_section">
          <div className="book_image">
            <img src="/book_img2.png" alt="Loading image!" className='image shadow-lg border border-blue-700 ' />
          </div>
          {
            props.type === 'user' ? <UserButtonSection isbn={book.isbn}/> : <AdminButtonSection book={book}/>
          }
        </div>

        <div className="book_details_section">
          <div className="book_features">

            <span className="book_title">{book_title} <span className={`noOfCopies ${noOfCopies > 0 ? 'in_stock' : 'out_stock'}`}>{noOfCopies > 0 ? "In Stock" : "Out of Stock"}</span></span>

            <span className='author'>by  {author}</span>

            <span className='mt-2 place_holder'>Publisher: <span className='place_value'>{publisher}</span></span>

            <span className='place_holder mt-1'>Date of publication: <span className='place_value'>{date_publication}</span></span>

            <span className='place_holder mt-1'>ISBN No: <span className='place_value'>{isbn_no}</span></span>

            <span className='place_holder mt-1'>Shelving No: <span className='place_value'>{shelVingNo}</span></span>

            <span className='place_holder mt-1'>No of copies: <span className='place_value'>{noOfCopies}</span></span>

            <span className='place_holder mt-2'>Description:
              <span className='description place_value ml-1 font-light'>{details.length > 200 ? details : details + "...."}</span>
            </span>
            {des.length > 30 ? <div onClick={handleMoreDetails} className="more text-blue-700 hover:underline">Read {read} <ExpandMoreOutlinedIcon ref={downRef} /><ExpandLessOutlinedIcon ref={upRef} style={{ display: 'none' }} /> </div> : null}

            {/* Related Books Section */}
            {props.type === 'user' ? <RelatedBookSection /> : null}
          </div>
          <div onClick={handleBackButton} className="back_button border h-8 p-1 rounded-full flex justify-center items-center bg-blue-300 border-blue-700 hover:bg-blue-400 cursor-pointer fixed right-8">
            <ArrowBackOutlinedIcon />
          </div>
        </div>

      </div>
    </>
  )
}
