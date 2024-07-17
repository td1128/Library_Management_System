const CopyCounter = ({ bookCopies, setBookCopies }) => {
  return (
    <div className="flex bg-red-100 w-fit">
      <button
        onClick={(e) => {
          e.preventDefault()
          setBookCopies(bookCopies + 1)
        }}
        className="w-8 text-gray-500 text-3xl ml-2"
      >
        {' '}
        +{' '}
      </button>
      <h1 className="text-xl my-auto mx-4"> {bookCopies} </h1>
      <button
        onClick={(e) => {
          e.preventDefault()
          setBookCopies(bookCopies > 1 ? bookCopies - 1 : 1)
        }}
        className="w-8 text-gray-500 text-3xl mr-2"
      >
        {' '}
        -{' '}
      </button>
    </div>
  )
}

export default CopyCounter
