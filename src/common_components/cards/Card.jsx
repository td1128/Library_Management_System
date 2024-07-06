import React, { useState } from 'react'
import './cardStyle.css'
import { useSelector, useDispatch } from 'react-redux'
import FavoriteIcon from '@mui/icons-material/Favorite';
import TravelExploreTwoToneIcon from '@mui/icons-material/TravelExploreTwoTone'
import Tooltip from '@mui/material/Tooltip'

const Card = ({ pic, title, author }) => {
  
  const [isFavorite, setIsFavorite] = useState(false)
  
  const toggleFavorite = () => {
    setIsFavorite((prevState) => !prevState)
  }

  return (
    <div className="custom-background">
      <div className="custom-availability" />
      <div
        className="custom-image"
        style={{
          margin: '-1.3vw auto 3px',
          borderRadius: '1vw',
          aspectRatio: '2/2.5',
          width: '97%',
          backgroundImage: `url(${pic})`,
        }}
      ></div>
      <div className="custom-name_section">
        
        <Tooltip title={title} arrow style={{margin:'0px 0px',padding:'0px 0px'}}>
          <h1 className="custom-book_name">{title}</h1>
        </Tooltip>
        <Tooltip title={author} arrow>
          <h1 className="custom-author_name">{author}</h1>
        </Tooltip>
      </div>
      <div className="flex gap-x-px custom-buttons">
        <button className="custom-stylebtn" onClick={toggleFavorite}>
          <FavoriteIcon
            style={{
              width: '1.5vw',
              height: '1.5vw',
              color: isFavorite ? '#d2324e' : 'grey',
            }}
          />
          <p>WishList</p>
        </button>
        <button className="custom-stylebtn">
          <TravelExploreTwoToneIcon
            style={{ width: '1.5vw', height: '1.5vw' }}
          />
          <p>Details</p>
        </button>
      </div>
    </div>
  )
}

export default Card
