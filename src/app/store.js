import { configureStore } from '@reduxjs/toolkit';
import { statsReducer } from '../features';

export const store = configureStore({
  reducer: {
    stats: statsReducer,
  },
});
