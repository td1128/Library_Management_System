
import { configureStore } from '@reduxjs/toolkit';
import { statsReducer, searchBookReducer, userSliceReducer,recomendedBookReducer } from '../features';
import RelatedBookReducer from '../features/relatedBoolReducer/RelatedBookReducer';
import ShowOverlayReducer from '../features/showOverlayReducer/ShowOverlayReducer'

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    stats: statsReducer,
    relatedBookList: RelatedBookReducer,
    recomendedBookList:recomendedBookReducer,
    searchBookList: searchBookReducer,
    showOverlay:ShowOverlayReducer,
  },
});
