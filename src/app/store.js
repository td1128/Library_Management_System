import { configureStore } from '@reduxjs/toolkit';
import { statsReducer, searchBookReducer } from '../features';
import RelatedBookReducer from '../features/relatedBoolReducer/RelatedBookReducer';

export const store = configureStore({
  reducer: {
    stats: statsReducer,
    relatedBookList: RelatedBookReducer,
    searchBookList: searchBookReducer,
  },
});
