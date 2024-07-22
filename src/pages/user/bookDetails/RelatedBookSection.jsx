import React from 'react'
import './BookDetailsDesign.css'
import { useSelector, useDispatch } from 'react-redux';
import MediaCard from './card_body'

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';


export default function RelatedBookSection() {
      //Getting book list from book list state
  const relatedBookList =  useSelector((state) => state.relatedBookList.books);
  const loading = useSelector((state)=> state.relatedBookList.loading);
  console.log("Related books : ", relatedBookList);
    return (
        <>
            <span className="related_books_heading mt-2 ">Related books</span>
            <div className="related_books flex flex-wrap flex-row mt-4">
                {loading === false ? Object.entries(relatedBookList).map(([isbn, book]) => (
                    <MediaCard key={isbn} isbn={isbn} book={book} />
                )) : <Box sx={{ display: 'flex' }} className="loading_style">
                    <CircularProgress />
                </Box>}

            </div>
        </>
    )
}
