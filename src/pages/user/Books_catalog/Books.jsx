import React from 'react'

import Card from '../../../common_components/cards/Card'

import image from '../../../common_components/cards/image.jpeg';
import image2 from '../../../common_components/cards/image2.webp';

import { useSelector, useDispatch } from 'react-redux';

import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';

import './style.css'


const Books = () => {

    const dispatch = useDispatch();
    const bookList = useSelector((state) => state.relatedBookList.books);
    const bookArray = Object.values(bookList);
    
    return (
        <div className='custom-Book_catalog_background'>
            <div className='custom-Recommended_section'>
                <p className='custom-head'>Recommended For You</p>
                <div className='custom-card'>
                    <button>
                    <SkipPreviousRoundedIcon style={{width:'3vw',height:'3vw'}}/>
                    </button>
                    {bookArray.map((book) => (
                        <Card pic={image} isbn_no={book.isbn} key={book.isbn} />
                    ))}
                    <button>
                    <SkipNextRoundedIcon style={{width:'3vw',height:'3vw'}}/>
                    </button>

                </div>
            </div>
            <div className='custom-Recommended_section'>
                <p className='custom-head'> Popular Among Your Peers</p>
                <div className='custom-card'>
                    <button>
                    <SkipPreviousRoundedIcon style={{width:'3vw',height:'3vw'}}/>
                    </button>
                    {bookArray.map((book) => (
                        <Card pic={image2} isbn_no={book.isbn} key={book.isbn} />
                    ))}
                    <button>
                    <SkipNextRoundedIcon style={{width:'3vw',height:'3vw'}}/>
                    </button>

                </div>
            </div>
        </div>
    )
}

export default Books
