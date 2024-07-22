import { createSlice } from '@reduxjs/toolkit';

// Convert array to object
const initialState = {
    value: true
};

const showOverlaySlice = createSlice({
    name: 'showOverlay',
    initialState,
    reducers: {
        setOverlayState: (state, action)=>{
            state.value = action.payload;
        },
    }
});

export const { setOverlayState } = showOverlaySlice.actions;
export default showOverlaySlice.reducer;