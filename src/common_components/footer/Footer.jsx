import React from 'react'
import { Link } from "react-router-dom";
import './FooterDesign.css'

export default function Footer() {
  return (
    <div className='footer_container'>
      <div className="logo">
        <div className="logo_img_name">

          <img className='logg-image' src="/book.png" alt="Image loading...." />
          <span className='font-serif text-2xl'>LitLib</span>
        </div>
        <Link to="/" className='text-xl underline hover:text-gray-500'>Contact Support</Link>
      </div>
      <div className="about">
        <h1 className='font-serif text-2xl font-bold '>About</h1>
        <p className='text-left '>LitLib is an attempt to create a digital platform for streamlining the physical processes involved with college libraries, for both users and admins.</p>
      </div>
      <div className="details">
        <h1 className='font-serif text-2xl font-bold '>Library Details</h1>
        <span className=' left_text mt-1'>Name: <span className='right_text'>JU ETCE Departmental Library</span></span>
        <span className=' left_text mt-1'>Address: <span className='right_text'>Kolkata</span></span>
        <span className=' left_text mt-1'>Contact no.: <span className='right_text'>123
          546996000</span></span>
        <span className=' left_text mt-1'>Working hours: <span className='right_text'>10am to 5.30pm</span></span>

      </div>
    </div>
  )
}
