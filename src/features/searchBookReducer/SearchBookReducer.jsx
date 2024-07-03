import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  books: {},
  loading: false,
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
      state.loading = false
    },
    setLoading: (state) => {
      state.loading = true
    }
  },
})

export const { setSearchQueryResult, setLoading } = searchBookListSlice.actions
export default searchBookListSlice.reducer

export const fetchSearchQueryResult =
  (searchQuery, availability, sortBy) => async (dispatch) => {
    const apiURL = import.meta.env.VITE_APP_API_URL
    availability = availability ? 'true' : 'false'
    sortBy = sortBy.toLowerCase()
    //searchQuery = searchQuery === '' ? 'a' : searchQuery
    dispatch(setLoading())
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
