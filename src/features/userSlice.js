import { createSlice } from '@reduxjs/toolkit';
import { fetchUserData, updateUserData, updateFavSubjectData } from './userThunks.js';

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
    libraryCardDetails: []
  },
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.details.email = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.details.phoneNumber = action.payload;
    },
    setAddress: (state, action) => {
      state.details.address = action.payload;
    },
    updateSubjectOfInterest: (state, action) => {
      state.details.subjectsOfInterest = [...action.payload];
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        const {
          first_name: firstName,
          last_name: lastName,
          id: studentID,
          join_date: joiningDate,
          email,
          phone_number: phoneNumber,
          address,
          roll: rollNo
        } = action.payload?.user.member;

        state.details = {
          name: `${firstName} ${lastName}`,
          department: 'Computer Science',
          studentID,
          joiningDate,
          rollNo,
          email,
          phoneNumber,
          address
        };

        state.details.subjectsOfInterest = action.payload?.user.favSub;

        state.details.libraryCardDetails = action.payload?.libraryCards;

        state.error = null;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'User data couldnot be fetched';
      })
      .addCase(updateUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update user details';
      })
      .addCase(updateFavSubjectData.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateFavSubjectData.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateFavSubjectData.rejected, (state) => {
        state.loading = false;
        state.error = action.payload || 'Subjects couldnot be updated'
      })
});

export const {
  setEmail,
  setPhoneNumber,
  setAddress,
  updateSubjectOfInterest,
} = userSlice.actions;

export default userSlice.reducer;