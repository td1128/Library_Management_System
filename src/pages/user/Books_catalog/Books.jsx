import React from 'react'

import Card from '../../../common_components/cards/Card'

import image from '../../../common_components/cards/image.jpeg';
import image2 from '../../../common_components/cards/image2.webp';
import { SearchBar } from '/src/common_components/SearchBar/SearchBar';

import { useSelector, useDispatch } from 'react-redux';

import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';


import './bookStyle.css'


const Books = () => {

    const dispatch = useDispatch();
    const bookList = useSelector((state) => state.searchBookList.books);
    const bookArray = Object.values(bookList);
    console.log(bookArray)
    return (
        <div className='custom-Book_catalog_background'>
            <SearchBar />
            <div className='custom-Recommended_section'>
                <p className='custom-head'>Recommended For You</p>
                <div className='custom-card'>
                    <button>
                    <SkipPreviousRoundedIcon style={{width:'3vw',height:'3vw'}}/>
                    </button>
                    {bookArray.map((book,index) => (
                        <Card key={index} pic={image} title={book.book.title} author={book.author_name} />
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
                    {bookArray.map((book,index) => (
                        <Card key={index} pic={image2} title={book.book.title} author={book.author_name} />
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
