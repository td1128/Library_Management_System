import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserDetails, updateUserDetails } from '../api';

export const fetchUserData = createAsyncThunk(
  'user/fetchData',
  async ( studentID, thunkAPI ) => {
    try {
      const data = fetchUserDetails( studentID );
      return data;
    } catch( error ) {
      return thunkAPI.rejectWithValue( error.response );
    }
  }
)

export const updateUserData = createAsyncThunk(
  'user/updateUserDetails',
  async ( studentDetails, thunkAPI ) => {
    try {
      const updateResponse = updateUserDetails( studentDetails );
      return updateResponse;
    } catch ( error ) {
      return thunkAPI.rejectWithValue( error.message );
    }
  }
)