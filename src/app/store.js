import { configureStore } from '@reduxjs/toolkit';
import BookListReducer from '../pages/user/bookDetails/bookListReducer/BookListReducer';

export const store = configureStore({
  reducer: {
    bookList: BookListReducer,
  },
});
