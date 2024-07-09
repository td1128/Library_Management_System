import { configureStore } from '@reduxjs/toolkit';
import { statsReducer, searchBookReducer, userSliceReducer } from '../features';
import RelatedBookReducer from '../features/relatedBoolReducer/RelatedBookReducer';

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    stats: statsReducer,
    relatedBookList: RelatedBookReducer,
    searchBookList: searchBookReducer,
  },
});
