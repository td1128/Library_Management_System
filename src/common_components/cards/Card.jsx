import React, { useState } from 'react'
import './cardStyle.css'
import { useSelector, useDispatch } from 'react-redux'
import FavoriteIcon from '@mui/icons-material/Favorite';
import TravelExploreTwoToneIcon from '@mui/icons-material/TravelExploreTwoTone'
import Tooltip from '@mui/material/Tooltip'

const Card = (props) => {
  
  const [isFavorite, setIsFavorite] = useState(false)
  
  const toggleFavorite = () => {
    setIsFavorite((prevState) => !prevState)
  }

  // const dispatch = useDispatch()
  // const bookList = useSelector((state) => state.relatedBookList.books)
  // const book = bookList[isbn_no];
  const book = props.book;
  // book.author = props.book.author_name;
  console.log("book in card component: ",props.book);

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
          backgroundImage: `url(${book.cover_img})`,
        }}
      ></div>
      <div className="custom-name_section">
        
        <Tooltip title={book.title} arrow style={{margin:'0px 0px',padding:'0px 0px'}}>
          <h1 className="custom-book_name">{book.title}</h1>
        </Tooltip>
        <Tooltip title={book.author} arrow>
          <h1 className="custom-author_name">{book.author}</h1>
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
