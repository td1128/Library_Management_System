import { configureStore } from '@reduxjs/toolkit';
import BookListReducer from '../pages/user/bookDetails/bookListReducer/BookListReducer';
import { statsReducer } from '../features';

export const store = configureStore({
  reducer: {
    stats: statsReducer,
    bookList: BookListReducer,
  },
});
