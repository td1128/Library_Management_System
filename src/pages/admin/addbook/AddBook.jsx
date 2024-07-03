import { useState } from 'react'
import { TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'

import CopyCounter from './CopyCounter'
import BookImageUpload from './BookImageUpload'
import fileUpload from '/src/services/fileUpload'
import InputTextField from './InputTextField'
import DescriptionField from './DescriptionField'
import DropdownSearch from './DropdownSearch'

import addBook from '/src/services/addBook'

import dayjs from 'dayjs'
import { subjects, shelves, authors } from './searchdata'
import './AddBook.css'

export const AddBook = () => {
  const [bookTitle, setBookTitle] = useState('')
  const [bookAuthor, setBookAuthor] = useState('')
  const [bookSubject, setBookSubject] = useState('')
  const [bookDescription, setBookDescription] = useState('')
  const [bookISBN, setBookISBN] = useState('')
  const [bookPublicationDate, setBookPublicationDate] = useState(null)
  const [bookCopies, setBookCopies] = useState(1)
  const [bookImage, setBookImage] = useState(null)
  const [shelvingNumber, setShelvingNumber] = useState('')
  const [bookEdition, setBookEdition] = useState(1)

  const inputFields = [
    {
      type: 'text',
      title: 'Title',
      value: bookTitle,
      setValue: setBookTitle,
      maxWidth: '40vw',
      pattern: /[\s\S]+/,
    },
    {
      type: 'search',
      title: 'Author',
      suggestions: authors,
      value: bookAuthor,
      setValue: setBookAuthor,
      maxWidth: '40vw',
    },
    {
      type: 'text',
      title: 'ISBN',
      value: bookISBN,
      setValue: setBookISBN,
      maxWidth: '40vw',
      pattern: /^[0-9]+(-[0-9]+)+$/,
    },
    {
      type: 'text',
      title: 'Edition',
      value: bookEdition,
      setValue: setBookEdition,
      maxWidth: '200px',
      pattern: /^\d+$/,
    },
    {
      type: 'search',
      title: 'Subject',
      suggestions: subjects,
      value: bookSubject,
      setValue: setBookSubject,
      maxWidth: '40vw',
    },
    {
      type: 'search',
      title: 'Shelving No.',
      suggestions: shelves,
      value: shelvingNumber,
      setValue: setShelvingNumber,
      maxWidth: '40vw',
    },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()

    inputFields.map((field) => {
        if (!field.value) return;
    });
    if (!bookImage) return;

    try {
      const url = await fileUpload({ file: bookImage })

      const req = {
        shelving_no: shelvingNumber.title,
        isbn: bookISBN,
        date_of_publication: dayjs(bookPublicationDate).format('DD-MM-YYYY'),
        edition: parseInt(bookEdition),
        no_of_copies: bookCopies,
        title: bookTitle,
        cover_img: url,
        author_name: bookAuthor,
        sub_name: bookSubject.title,
        description: bookDescription,
      }

      console.log(req)
      addBook(req)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="input-form">
      <div className="upload-container">
        <BookImageUpload setImage={setBookImage} />
        <button type="submit" className="form-button">
          Add Book
        </button>
      </div>
      <div className="form-grid">
        {inputFields.map((field, index) => (
          <div key={index} className="inputfield">
            {field.type==='text' && <InputTextField {...field} />}
            {field.type==='search' && <DropdownSearch {...field} />}
          </div>
        ))}
        <div className="inputfield col-span-1 lg:col-span-2">
          <DescriptionField
            bookDescription={bookDescription}
            setBookDescription={setBookDescription}
          />
        </div>
        <div className="form-container">
          <div className="inputfield">
            <h1 className="text-md"> {`Publication Date`} </h1>
            <DatePicker
              sx={{ width: '11rem' }}
              value={bookPublicationDate}
              inputFormat="DD-MM-YYYY"
              views={['year', 'month', 'day']}
              onChange={(date) => {
                setBookPublicationDate(date)
              }}
            />
          </div>
          <div className="inputfield">
            <h2 className="text-md mb-2"> {`Number of Copies`} </h2>
            <CopyCounter
              bookCopies={bookCopies}
              setBookCopies={setBookCopies}
            />
          </div>
        </div>
      </div>
    </form>
  )
}
