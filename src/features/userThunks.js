import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserDetails } from '../api';

export const fetchUserData = createAsyncThunk(
  'user/fetchData',
  async ( studentID, thunkAPI ) => {
    try {
      const data = fetchUserDetails( studentID );
      return data;
    } catch( error ) {
      return thunkAPI.rejectWithValue( error.response )
    }
  }
)