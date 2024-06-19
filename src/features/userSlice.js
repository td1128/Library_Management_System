import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserData = createAsyncThunk(
  'user/fetchData',
  async ( studentID, thunkAPI ) => {
    try {
      const userRootUrl = import.meta.env.VITE_APP_USER_ROOT_URL;
      const getUserDetails = import.meta.env.VITE_APP_GET_USER_DETAILS;
      
      const res = await axios.get( `${userRootUrl}/${getUserDetails}/${studentID}` );
      console.log(res);
      // return res.data
    } catch( error ) {
      return thunkAPI.rejectWithValue( error.response )
    }
  }
)


const initialName = 'John Doe';
const initialDepartment = 'Computer Science';
const initialStudentID = '223143';
const initialJoiningDate = '21/11/2022';
const initialRollNo = '05011001087';
const initialEmail = 'johndoe@example.com';
const initialPhoneNumber = '+91 12345 67890';
const initialAddress = '188, Raja Subodh Chandra Mallick Rd, Jadavpur, Kolkata, West Bengal 700032';
const initialSubjectsOfInterest = ['Data Structures and Algorithms', 'Computer Organization and Architecture', 'Database Management System', 'Software Engineering'];

const initialState = {
  details: {
    name: initialName,
    department: initialDepartment,
    studentID: initialStudentID,
    joiningDate: initialJoiningDate,
    rollNo: initialRollNo,
    email: initialEmail,
    phoneNumber: initialPhoneNumber,
    address: initialAddress,
    subjectsOfInterest: initialSubjectsOfInterest,
  },
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    addSubjectOfInterest: (state, action) => {
      state.subjectsOfInterest.push(action.payload);
    },
    removeSubjectOfInterest: (state, action) => {
      state.subjectsOfInterest = state.subjectsOfInterest.filter(subject => subject !== action.payload);
    },
  },
  extraReducers: builder => 
    builder
      .addCase( fetchUserData.pending, ( state ) => {
        state.loading = true;
      } )
      .addCase( fetchUserData.fulfilled, ( state, action ) => {
        state.loading = false;
        // state.details = action.payload
      } )
      .addCase( fetchUserData.rejected, ( state, action ) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong'
      } )
});

export const {
  setEmail,
  setPhoneNumber,
  setAddress,
  addSubjectOfInterest,
  removeSubjectOfInterest,
} = userSlice.actions;

export default userSlice.reducer;
