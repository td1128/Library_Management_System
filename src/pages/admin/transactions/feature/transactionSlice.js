// // transactionSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const transactionSlice = createSlice({
//   name: 'transactions',
//   initialState: [],
//   reducers: {
//     issueBook: (state, action) => {
//       state.push({
//         id: new Date().toISOString(),
//         bookId: action.payload.bookId,
//         userId: action.payload.userId,
//         type: 'issue',
//         date: new Date().toISOString(),
//       });
//     },
//     returnBook: (state, action) => {
//       state.push({
//         id: new Date().toISOString(),
//         bookId: action.payload.bookId,
//         userId: action.payload.userId,
//         type: 'return',
//         date: new Date().toISOString(),
//       });
//     },
//   },
// });

// export const { issueBook, returnBook } = transactionSlice.actions;
// export default transactionSlice.reducer;
