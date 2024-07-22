import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  books: {},
}

const searchBookListSlice = createSlice({
  name: 'bookList',
  initialState,
  reducers: {
    setSearchQueryResult: (state, action) => {
      const bookArray = action.payload
      state.books = bookArray.reduce((acc, item) => {
        acc[item.book.isbn] = item
        return acc
      }, {})
    },
    
    updateSearchBookDetails: (state, action)=>{
      const book_details = action.payload;
      state.books[book_details.book.isbn] = book_details;
    },
    updateSearchBookAvailability: (state, action)=>{
      console.log("called update search book avl : ",action.payload);
      const {isbn, noOfCopies} = action.payload;
      console.log("isbn: ",isbn," no: ",noOfCopies);
      state.books[isbn].book.no_of_copies = noOfCopies;
    }

  },
})

export const { setSearchQueryResult, updateSearchBookDetails, updateSearchBookAvailability } = searchBookListSlice.actions
export default searchBookListSlice.reducer

export const fetchSearchQueryResult =
  (searchQuery, availability, sortBy) => async (dispatch) => {
    const apiURL = import.meta.env.VITE_APP_API_URL
    availability = availability ? 'true' : 'false'
    sortBy = sortBy.toLowerCase()
    //searchQuery = searchQuery === '' ? 'a' : searchQuery
    try {
      const response = await fetch(
        `${apiURL}/api/common/book/search/input/${searchQuery}?availability=${availability}&sortby=${sortBy}`
      )
      const data = await response.json()
      dispatch(setSearchQueryResult(data))
    } catch (error) {
      console.log('Error fetching search result: ', error)
    }
  }
