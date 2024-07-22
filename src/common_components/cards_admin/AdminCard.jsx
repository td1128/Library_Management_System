import React from 'react'
import { NavLink } from 'react-router-dom';
import './AdminCardStyle.css'
import TravelExploreTwoToneIcon from '@mui/icons-material/TravelExploreTwoTone'

const AdminCard = ({ Object }) => {

  const path = `/admin/books/view-details/${Object.book.isbn}`
  return (
    <div className="custom-frame">
      <div className="custom-image" style={{ backgroundImage: `url(${Object.book.cover_img})` }}></div>
      <div className="custom-book_contents">
        <div className="custom-content">
          <p className="custom-book_name">
            {Object.book.title}
          </p>
          <div className="custom-details">
            <p className="custom-author_name">
              {Object.author_name}
            </p>
            <p>Subject: {Object.sub_name}</p>
            <p>ISBN No: {Object.book.isbn}</p>
            <p>In Stock: {Object.book.no_of_copies}</p>
          </div>
        </div>
        <NavLink to={path} className="custom-more">
          <TravelExploreTwoToneIcon
            style={{ width: '1.4vw', height: '1.4vw' }}
          />
          View Details
        </NavLink>
      </div>
    </div>
  )
}

export default AdminCard
