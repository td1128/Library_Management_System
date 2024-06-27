import React, { useState } from 'react'
import './style.css'
import { useSelector, useDispatch } from 'react-redux'
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone'
import TravelExploreTwoToneIcon from '@mui/icons-material/TravelExploreTwoTone'

const Card = ({ pic, isbn_no }) => {
  const [isFavorite, setIsFavorite] = useState(false)

  const toggleFavorite = () => {
    setIsFavorite((prevState) => !prevState)
  }

  const dispatch = useDispatch()
  const bookList = useSelector((state) => state.relatedBookList.books)
  const book = bookList[isbn_no]

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
        <h1 className="custom-book_name">{book.title}</h1>
        <h1 className="custom-author_name">{book.author}</h1>
      </div>
      <div className="flex gap-x-px custom-buttons">
        <button className="custom-stylebtn" onClick={toggleFavorite}>
          <FavoriteTwoToneIcon
            style={{ width:'1.5vw', height:'1.5vw',color: isFavorite ? 'rgb(174, 39, 61)' : 'grey' }}
          />
          <p>WishList</p>
        </button>
        <button className="custom-stylebtn">
          <TravelExploreTwoToneIcon style={{width:'1.5vw', height:'1.5vw'}}/>
          <p>Details</p>
        </button>
      </div>
    </div>
  )
}

export default Card
