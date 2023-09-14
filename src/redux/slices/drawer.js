import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pinned: false,
  open: false,
};

const slice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    setPinned: (state, action) => {
      state.pinned = action.payload;
    },
    setOpen: (state, action) => {
      state.open = action.payload;
    },
  },
});

// Reducer
export const { setPinned, setOpen } = slice.actions;
export default slice.reducer;
