import React from 'react'
import './AdminCardStyle.css'
import TravelExploreTwoToneIcon from '@mui/icons-material/TravelExploreTwoTone'
import { useSelector, useDispatch } from 'react-redux'

const AdminCard = ({ Object }) => {

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
            <p>Availability/Stock</p>
          </div>
        </div>
        <button className="custom-more">
          <TravelExploreTwoToneIcon
            style={{ width: '1.4vw', height: '1.4vw' }}
          />
          View Details
        </button>
      </div>
    </div>
  )
}

export default AdminCard
