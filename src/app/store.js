import { configureStore } from '@reduxjs/toolkit';
import RelatedBookReducer from '../features/relatedBoolReducer/RelatedBookReducer';

export const store = configureStore({
  reducer: {
    relatedBookList: RelatedBookReducer,
  },
});
