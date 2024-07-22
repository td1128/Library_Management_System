import { createSlice } from '@reduxjs/toolkit';

const fetchDataToArray = async (apiUrl) => {
    try {
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };
  
  // Usage example
const apiURL = import.meta.env.VITE_APP_API_URL
const initialArray = await fetchDataToArray(`${apiURL}/api/user/books/recommendation?`);


// Convert array to object
const initialState = {
    books: initialArray.reduce((acc, item) => {
        // console.log("item: ",item);
        acc[item. book.isbn] = item;
        return acc;
    }, {})
};

const recomendedBookListSlice = createSlice({
    name: 'bookList',
    initialState,
    reducers: {
        setInitialState: (state, action)=>{//TODO

        },
        setBookDetails: (state, action) => {
            const { key, value } = action.payload;
            state.bookList[key] = value; // Set value in the object
        },
        removeBookDetails: (state, action) => {
            const { key } = action.payload;
            delete state.bookList[key]; // Remove value from the object
        }
    }
});

export const { setBookDetails, removeBookDetails, setInitialState } = recomendedBookListSlice.actions;
export default recomendedBookListSlice.reducer;