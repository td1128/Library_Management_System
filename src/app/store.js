import { configureStore } from '@reduxjs/toolkit';
import { userSliceReducer } from '../features';

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
  },
});
