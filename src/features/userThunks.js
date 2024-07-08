import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateFavSubject, fetchUserDetails, updateUserDetails, getLibraryCards } from '../services';

export const fetchUserData = createAsyncThunk(
  'user/fetchData',
  async ( studentID, thunkAPI ) => {
    try {
      const data = await fetchUserDetails( studentID );
      const libCards = await getLibraryCards( studentID );

      console.log(data);
      console.log(libCards);
      return { user: data, libraryCards: libCards };
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

export const updateFavSubjectData = createAsyncThunk(
  'user/addSubjects',
  async ( { subjects, membership_id }, thunkAPI ) => {
    try {
      const subjectAddedResponse = await updateFavSubject( membership_id, subjects );
      return subjectAddedResponse;
    } catch( error ) {
      return thunkAPI.rejectWithValue( error.message );
    }
  }
);