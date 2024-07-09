import React from 'react'
import Card from '../../../common_components/cards/Card'

import image from '../../../common_components/cards/image.jpeg'
import image2 from '../../../common_components/cards/image2.webp'
import { useSelector, useDispatch } from 'react-redux'

import './style/RecommendedPageStyle.css'

const breakArrayIntoChunks = (array, chunkSize) => {
  const result = []
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize)
    result.push(chunk)
  }
  return result
}

const RecommendedPage = ({ bookArray, condition }) => {
  console.log("book array at recomended page: ",bookArray);
  let chunkedBook = []
  let heading = ''
  if (condition === 'After_Search') {
    chunkedBook = breakArrayIntoChunks(bookArray, 5)
    heading = 'Your Searched Results'
  } else {
    const dispatch = useDispatch()
    const bookList = useSelector((state) => state.recomendedBookList.books)
    bookArray = Object.values(bookList)
    chunkedBook = breakArrayIntoChunks(bookArray, 5)
    heading = 'Recommendations for You'
  }

  console.log("chunked book: ",chunkedBook);
  console.log("heading in recomended book: ",heading);

  chunkedBook.map((BookChunk, chunkIndex)=>{
    BookChunk.map((books, index) =>{
      console.log(`book chunk(${index}) : `,books);

    })
  })

  return (
    <>
      <div className='heading'>{heading}</div>
      <div className="custom-BookBackground">
        {chunkedBook.map((BookChunk, chunkIndex) => (
          <div className="custom-Bookrows" key={chunkIndex}>
            {BookChunk.map((books, index) => (
              <Card Object={books} key={books.book.isbn}/>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

export default RecommendedPage
