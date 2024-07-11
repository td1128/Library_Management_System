import React, { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom';
import './cardStyle.css'
import { useSelector, useDispatch } from 'react-redux'
import FavoriteIcon from '@mui/icons-material/Favorite';
import TravelExploreTwoToneIcon from '@mui/icons-material/TravelExploreTwoTone'
import Tooltip from '@mui/material/Tooltip'
import image from '/src/common_components/cards/image.jpeg'
import { useNavigate } from 'react-router-dom';
import "/src/common_components/ViewBookDetails/ShowBookDetails"

import ShortcutIcon from '@mui/icons-material/Shortcut';

import { toast } from 'react-toastify';

const Card = ({ Object }) => {
  const wishList = useSelector((state)=>state.user.wishList);
  const isbn_no = Object.book.isbn;
  const navigate = useNavigate();

  const heartRef = useRef();

  const [isAdded, setIsAdded] = useState(isbn_no in wishList?true:false);

  const handleAddtoWishlist = async () => {
    if (isAdded == false) {
      const apiURL = import.meta.env.VITE_APP_API_URL
      const memberId = 'm_11201';//TODO 

      toast.info("Request sent to the server.");

      try {
        const response = await fetch(`${apiURL}/api/user/books/wishlist/isbn/${isbn_no}/memberId/${memberId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const json = await response.json()
        if (response.status === 200 && json.message != "Member does not exist") {
          setIsAdded(true);
          // setIsFavorite((prevState) => !prevState)
          setIsFavorite(true)

          toast.success("Book added to your wishlist.");
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
    else {
      navigate("/")
    }
  }

  const [isFavorite, setIsFavorite] = useState(isbn_no in wishList?true:false)

  const toggleFavorite = () => {
    if(isFavorite === false){
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
    <div className="custom-background">
      <div className="custom-availability" style={{background: Object.book.no_of_copies>0 ? '#3fd43f':'#d32e0d'}}/>
      <div
        className="custom-image"
        style={{
          margin: '-1.3vw auto 3px',
          borderRadius: '1vw',
          aspectRatio: '2/2.5',
          width: '97%',
          backgroundImage: `url(${Object.book.cover_img})`
        }}
      ></div>
      <div className="custom-name_section">

        <Tooltip title={Object.book.title} arrow>
          <p className="custom-book_name">{Object.book.title}</p>
        </Tooltip>
        <Tooltip title={Object.author_name} arrow>
          <p className="custom-author_name">{Object.author_name}</p>
        </Tooltip>
      </div>
      <div className="flex gap-x-px custom-buttons">
        <button className="custom-stylebtn" onClick={toggleFavorite} >

          {isFavorite?<ShortcutIcon/>:<FavoriteIcon
            style={{
              width: '1.5vw',
              height: '1.5vw',
              color: isFavorite ? 'red' : 'grey',
            }}
          />}
          <p>{isFavorite? "Show list":"Wishlist"}</p>

        </button>
        <NavLink to={path} className="custom-stylebtn">
          <TravelExploreTwoToneIcon
            style={{ width: '1.5vw', height: '1.5vw' }}
          />
          <p>Details</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Card