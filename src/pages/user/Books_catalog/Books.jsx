import React, { } from 'react'
import RecommendedPage from './RecommendedPage'
import {SearchBar} from  '../../../common_components/SearchBar/SearchBar'
import { useSelector, useDispatch } from 'react-redux';
import Card from '../../../common_components/cards/Card'

import image from '../../../common_components/cards/image.jpeg'

const Books = () => {
  const dispatch = useDispatch();
  const bookList = useSelector((state) => state.searchBookList.books);
  const bookArray = Object.values(bookList)

  return (
    <>
    <SearchBar/>
    {/* <RecommendedPage bookArray={bookArray}/> */}
    {bookArray.length >0? <RecommendedPage bookArray={bookArray} condition='After_Search'/> : <RecommendedPage condition='Before_Search'/>}
    {/* <Initial_page/> */}
    </>
  )
}

export default Books
