import { createSlice } from '@reduxjs/toolkit';
import { fetchUserData } from './userThunks.js'

const initialState = {
  details: {
    name: '',
    department: '',
    studentID: '',
    joiningDate: '',
    rollNo: '',
    email: '',
    phoneNumber: '',
    address: '',
    subjectsOfInterest: [],
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
        const {
          first_name: firstName,
          last_name: lastName,
          membership_id: studentID,
          join_date: joiningDate,
          email,
          phone_number: phoneNumber,
          address,
        } = action.payload;

        state.details = {
          name: `${firstName} ${lastName}`,
          department: 'Computer Science',
          studentID,
          joiningDate,
          rollNo: '05011001087', 
          email,
          phoneNumber,
          address,
          subjectsOfInterest: ['Data Structures and Algorithms', 'Computer Organization and Architecture', 'Database Management System', 'Software Engineering'],
        };

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
