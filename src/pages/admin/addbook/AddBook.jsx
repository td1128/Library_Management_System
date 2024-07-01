import { useState } from 'react'
import { TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'

import CopyCounter from './CopyCounter'
import BookImageUpload from './BookImageUpload'
import fileUpload from '/src/services/fileUpload'
import InputTextField from './InputTextField'
import DescriptionField from './DescriptionField'
import addBook from '/src/services/addBook'

import dayjs from 'dayjs'
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

  const inputFields = [
    {
      title: 'Title',
      value: bookTitle,
      handleChange: (e) => setBookTitle(e.target.value),
    },
    {
      title: 'Author',
      value: bookAuthor,
      handleChange: (e) => setBookAuthor(e.target.value),
    },
    {
      title: 'Subject',
      value: bookSubject,
      handleChange: (e) => setBookSubject(e.target.value),
    },
    {
      title: 'ISBN',
      value: bookISBN,
      handleChange: (e) => setBookISBN(e.target.value),
    },
    {
      title: 'Shelving Number',
      value: shelvingNumber,
      handleChange: (e) => setShelvingNumber(e.target.value),
    },
  ]

  const handleSubmit = async () => {
    if (!bookImage) return
    try {
      const url = await fileUpload({ file: bookImage })

      const req = {
        shelving_no: shelvingNumber,
        isbn: bookISBN,
        date_of_publication: dayjs(bookPublicationDate).format('DD-MM-YYYY'),
        edition: 1,
        no_of_copies: bookCopies,
        title: bookTitle,
        cover_img: url,
        author_name: bookAuthor,
        sub_name: bookSubject,
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
    <div className="flex gap-10 md:gap-10 ml-10 mt-2">
      <div className="w-1/2 max-w-96 flex flex-col h-full justify-between items-center">
        <BookImageUpload setImage={setBookImage} />
        <button
          onClick={handleSubmit}
          className="w-64 bg-red-500 text-white text-2xl rounded-md mt-5 py-1"
        >
          Add Book
        </button>
      </div>
      <div className="w-full flex flex-col gap-4 mb-16">
        {inputFields.map((field, index) => (
          <div key={index} className="inputfield">
            <InputTextField field={field} />
          </div>
        ))}
        <div className="inputfield">
          <DescriptionField
            bookDescription={bookDescription}
            setBookDescription={setBookDescription}
          />
        </div>
        <div className="flex gap-4 w-fit">
          <div className="inputfield">
            <h1 className="text-md my-auto"> {`Publication Date`} </h1>
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
            <h2 className="text-md my-auto"> {`Number of Copies`} </h2>
            <CopyCounter
              bookCopies={bookCopies}
              setBookCopies={setBookCopies}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
