import React from 'react'
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import WishListCard from '../../../common_components/wishlist_card/WishListCard';

export default function WishList() {
    const wishList =  useSelector((state) => state.user.wishList);
    const loading = useSelector((state)=> state.user.loading);
    const noOfBooks = Object.keys(wishList).length;
  return (
    <>
            <span className="related_books_heading mt-2 ">My Wishlist <span className=' font-thin text-xl'>{noOfBooks} {noOfBooks>0?'books':'book'}</span></span>
            <div className="related_books flex flex-wrap flex-row mt-4">
                {loading === false ? Object.entries(wishList).map(([isbn, book]) => (
                    <WishListCard key={isbn} Object={book} />
                )) : <Box sx={{ display: 'flex' }} className="loading_style">
                    <CircularProgress />
                </Box>}
                {
                    loading === false && Object.keys(wishList).length === 0 && <span className="no_books">No books found!
                    </span>
                }

            </div>
        </>
  )
}
