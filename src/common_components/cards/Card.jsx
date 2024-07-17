import React, { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom';
import './cardStyle.css'
import { useSelector, useDispatch } from 'react-redux'
import FavoriteIcon from '@mui/icons-material/Favorite';
import TravelExploreTwoToneIcon from '@mui/icons-material/TravelExploreTwoTone'
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import "/src/common_components/ViewBookDetails/ShowBookDetails"
import { toast } from 'react-toastify';

import { addBookToWishList, removeBookFromWishList } from '../../features/userSlice';

//Boot Strap modal
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Card = ({ Object }) => {
  const dispatch = useDispatch();

  // Used for modal control.
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const wishList = useSelector((state) => state.user.wishList);
  const isbn_no = Object.book.isbn;
  const navigate = useNavigate();

  const modalRef = useRef();

  const [isAdded, setIsAdded] = useState(isbn_no in wishList ? true : false);
  const [isFavorite, setIsFavorite] = useState(isbn_no in wishList ? true : false)

  const handleAddtoWishlist = async () => {
    if (isAdded == false) {
      const apiURL = import.meta.env.VITE_APP_API_URL
      const memberId = 'm_11201';//TODO 

      toast.info("Request sent to the server.");
      setIsFavorite(true);

      try {
        const response = await fetch(`${apiURL}/api/user/books/add-wishlist/isbn/${isbn_no}/memberId/${memberId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const json = await response.json()
        if (response.status === 200 && json.message != "Member does not exist") {
          dispatch(addBookToWishList(Object));
          setIsAdded(true);
          setIsFavorite(true);

          toast.success("Book added to your wishlist.");
        }
        else {
          toast.error(json.message);
          setIsFavorite(false);
        }
        console.log(`Response for add to favorite books isbn - ${isbn_no} :  ${json.message}`);
      } catch (error) {
        setIsFavorite(false);
        toast.error("Something went wrong. Please try again later.")
        console.log('Error while requesing for add to favorite books: ', error)
      }
    }
    else {
      modalRef.current.click();
    }
  }

  const handleRemoveWishList = async ()=>{
    setShow(false)
    const apiURL = import.meta.env.VITE_APP_API_URL
      const memberId = 'm_11201';//TODO 

      toast.info("Request sent to the server.");

      try {
        const response = await fetch(`${apiURL}/api/user/books/remove-wishlist/isbn/${isbn_no}/memberId/${memberId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const json = await response.json()
        if (response.status === 200 && json.message != "Member does not exist") {
          dispatch(removeBookFromWishList(Object));
          setIsAdded(false);
          setIsFavorite(false)

          toast.success("Book removed from your wishlist successfully.");
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


  const toggleFavorite = () => {
    if (isFavorite === false) {
      handleAddtoWishlist();
    }
    else {
      navigate("/user/books/goto-wishlist")
    }
  }
  console.log("Object at card: ", Object)
  // console.log(Object)
  const path = `/user/books/viewdetails/${Object.book.isbn}`

  return (
    <>
      <Button ref={modalRef} variant="primary" onClick={handleShow} className='hidden'>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Book from Wish List</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove "<span className='font-bold underline'>{Object.book.title}</span>" from wish list?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleRemoveWishList}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="custom-background border-1 border-red-900 shadow-xl">
        <div className={`h-52 w-auto m-2 book-card ${Object.book.no_of_copies === 0?'out-of-stock':''}`}>
          <img src={Object.book.cover_img} alt="Image loading...." className={`h-full w-full rounded-lg border-1 border-gray-400 `} />
        </div>
        {/* {Object.book.no_of_copies === 0 && (
        <div className={`${Object.book.no_of_copies === 0?'z-5':'out-of-stock'}`}>Out of Stock</div>
      )} */}
        <div className="custom-name_section">

          <Tooltip title={Object.book.title} arrow>
            <p className="custom-book_name text-red-900">{Object.book.title}</p>
          </Tooltip>
          <Tooltip title={Object.author_name} arrow>
            <p className="custom-author_name text-red-900">{Object.author_name}</p>
          </Tooltip>
        </div>
        <div className="flex gap-x-px custom-buttons">
          <div onClick={handleAddtoWishlist} className={`border-1 border-red-900 bg-slate-50 rounded-xl w-10 h-10 flex justify-center items-center hover:cursor-pointer`}>

            <FavoriteIcon className={`${isFavorite ? 'text-pink-600 hover:text-pink-700' : 'text-gray-500 hover:text-pink-600'} `} style={{ height: "1.5rem", width: "1.5rem" }} />
          </div>
          <NavLink to={path} className="custom-stylebtn py-3 border-1 border-red-900 bg-slate-50 text-red-900 hover:bg-red-800 hover:text-white">
            <TravelExploreTwoToneIcon
              className=""
              style={{ width: '1.5vw', height: '1.5vw' }}
            />
            <p>Details</p>
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default Card