import { createSlice } from '@reduxjs/toolkit';

// Convert array to object
const initialState = {
    books: [],
    loading: true
};

const relatedBookListSlice = createSlice({
    name: 'bookList',
    initialState,
    reducers: {
        setRelatedBookList: (state, action)=>{
            const bookArray = action.payload;
            state.books = bookArray.reduce((acc, item) => {
                acc[item.book.isbn] = item;
                return acc;
            }, {});
            state.loading = false;
        },
        setBookDetails: (state, action) => {
            const { key, value } = action.payload;
            state.books[key] = value;// Set value in the object
        },
        removeBookDetails: (state, action) => {
            const { key } = action.payload;
            delete state.books[key];// Remove value from the object
        }
    }
});

export const { setBookDetails, removeBookDetails, setRelatedBookList } = relatedBookListSlice.actions;
export default relatedBookListSlice.reducer;

export const fetchRelatedBookList =
  (isbn) => async (dispatch) => {
    const apiURL = import.meta.env.VITE_APP_API_URL
    try {
      const response = await fetch(
        `${apiURL}/api/user/books/related-books/isbn/${isbn}`
      )
      const data = await response.json()
      console.log(data)
      dispatch(setRelatedBookList(data))
    } catch (error) {
      console.log('Error while fetching related books: ', error)
    }
  }