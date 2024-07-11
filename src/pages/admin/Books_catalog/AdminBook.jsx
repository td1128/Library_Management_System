import React from 'react'
import AdminCard from '../../../common_components/cards_admin/AdminCard'

import image from '../../../common_components/cards/image.jpeg'
import image2 from '../../../common_components/cards/image2.webp'
import { useSelector, useDispatch } from 'react-redux';
import { SearchBar } from '/src/common_components/SearchBar/SearchBar';

import './AdminBookStyle.css'

const breakArrayIntoChunks = (array, chunkSize) => {
  const result = []
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize)
    result.push(chunk)
  }
  return result
}

const AdminBook = () => {
  const dispatch = useDispatch();
  const bookList = useSelector((state) => state.searchBookList.books);
  const bookArray = Object.values(bookList)
  console.log(bookArray)
  let chunkedBooks= breakArrayIntoChunks(bookArray, 3);
  return (
    <>
    <SearchBar/>
    <div className='custom-Book_Background'>
      {chunkedBooks.map((BookChunk, chunkIndex) => (
        <div className='custom-Book_rows' key={chunkIndex}>
          {BookChunk.map((Books, index) => (
            // console.log(animal.book)
            <AdminCard Object={Books} key={Books.book.isbn} />
          ))}
        </div>
      ))}
    </div>

    </>

    
  )
}

export default AdminBook
