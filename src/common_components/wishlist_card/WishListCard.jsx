import React, { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom';
import '../cards/cardStyle.css';
import { useSelector, useDispatch } from 'react-redux'
import FavoriteIcon from '@mui/icons-material/Favorite';
import TravelExploreTwoToneIcon from '@mui/icons-material/TravelExploreTwoTone'
import Tooltip from '@mui/material/Tooltip'
import "/src/common_components/ViewBookDetails/ShowBookDetails"

const WishListCard = ({ Object }) => {
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
        <button className="custom-stylebtn-wishlist" disabled = {true}>
          <FavoriteIcon
            style={{
              width: '1.5vw',
              height: '1.5vw',
              color: 'red',
            }}
          />
          <p>Favourite</p>
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

export default WishListCard