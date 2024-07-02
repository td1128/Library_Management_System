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
import { subjects, shelves } from './searchdata'
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
      title: 'Title',
      value: bookTitle,
      handleChange: (e) => setBookTitle(e.target.value),
      maxWidth: '25vw',
    },
    {
      title: 'Author',
      value: bookAuthor,
      handleChange: (e) => setBookAuthor(e.target.value),
      maxWidth: '25vw',
    },
    {
      title: 'ISBN',
      value: bookISBN,
      handleChange: (e) => setBookISBN(e.target.value),
      maxWidth: '25vw',
    },
    {
      title: 'Edition',
      value: bookEdition,
      handleChange: (e) => setBookEdition(e.target.value),
      maxWidth: '300px',
    },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!bookImage) return
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
    <form className="flex gap-10 ml-10 mt-2 pb-4">
      <div className="w-1/2 max-w-96 flex flex-col h-full justify-between items-center">
        <BookImageUpload setImage={setBookImage} />
        <button
          onClick={handleSubmit}
          className="w-64 bg-red-500 text-white text-2xl rounded-md mt-5 py-1"
        >
          Add Book
        </button>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 h-fit">
        {inputFields.map((field, index) => (
          <div key={index} className="inputfield">
            <InputTextField field={field} />
          </div>
        ))}
        <div className="inputfield">
          <h1 className="text-md"> {`Subject`} </h1>
          <DropdownSearch
            title="Subject"
            suggestions={subjects}
            value={bookSubject}
            setValue={setBookSubject}
          />
        </div>
        <div className="inputfield">
          <h1 className="text-md"> {`Shelving No.`} </h1>
          <DropdownSearch
            title="Shelving No."
            suggestions={shelves}
            value={shelvingNumber}
            setValue={setShelvingNumber}
          />
        </div>
        <div className="inputfield col-span-1 lg:col-span-2">
          <DescriptionField
            bookDescription={bookDescription}
            setBookDescription={setBookDescription}
          />
        </div>
        <div className="flex gap-10 w-fit">
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
