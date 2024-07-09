import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import './cardStyle.css'
import { useSelector, useDispatch } from 'react-redux'
import FavoriteIcon from '@mui/icons-material/Favorite';
import TravelExploreTwoToneIcon from '@mui/icons-material/TravelExploreTwoTone'
import Tooltip from '@mui/material/Tooltip'
import image from '/src/common_components/cards/image.jpeg'
import "/src/common_components/ViewBookDetails/ShowBookDetails"

const Card = ({Object}) => {

  const [author, setAuthor] = useState(Object===undefined?"":Object.author_name);
  const [title, setTitle] = useState(Object===undefined?"":Object.book.title);
  const [cover_image, setCoverImage] = useState(Object===undefined?"":Object.book.cover_img);
  const [isbn, setIsbn] = useState(Object===undefined?0:Object.book.isbn);

  useEffect(()=>{
    setAuthor(Object===undefined?"":Object.author_name);
    setTitle(Object===undefined?"":Object.book.title);
    setCoverImage(Object===undefined?"":Object.book.cover_img);
    setIsbn(Object===undefined?0:Object.book.isbn);
  },[Object])

  const [isFavorite, setIsFavorite] = useState(false)

  const toggleFavorite = () => {
    setIsFavorite((prevState) => !prevState)
  }
  console.log("Object at card: ",Object)
  // console.log(Object)
  const path = `/user/book/viewdetails/${isbn}`

  return (
    <>
  {Object !== undefined?

    <div className="custom-background">
      <div className="custom-availability" />
      <div
      className="custom-image"
      style={{
        margin: '-1.3vw auto 3px',
        borderRadius: '1vw',
        aspectRatio: '2/2.5',
        width: '97%',
        backgroundImage: `url(${cover_image})`
      }}
      ></div>
        <div className="custom-name_section">
        
        <Tooltip title={title} arrow>
        <p className="custom-book_name">{title}</p>
        </Tooltip>
        <Tooltip title={author} arrow>
        <p className="custom-author_name">{author}</p>
        </Tooltip>
        </div>
        <div className="flex gap-x-px custom-buttons">
        <button className="custom-stylebtn" onClick={toggleFavorite} style={{justifyContent:'center'}}>
        <FavoriteIcon
        style={{
          width: '1.5vw',
          height: '1.5vw',
          color: isFavorite ? '#d2324e' : 'grey',
        }}
        />
        <p>WishList</p>
        </button>
        <NavLink to={path} className="custom-stylebtn">
        <TravelExploreTwoToneIcon
        style={{ width: '1.5vw', height: '1.5vw' }}
        />
        <p>Details</p>
        </NavLink>
        </div>
        </div>:null
}
  </>
  )
}

export default Card
