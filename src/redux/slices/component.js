import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  componentNum: 0,
};

const slice = createSlice({
  name: 'component',
  initialState,
  reducers: {
    setComponentNum: (state, action) => {
      state.componentNum = action.payload;
    },
    clearComponentNum: (state, action) => {
      state.componentNum = 0;
    },
  },
});

// Reducer
export const { setComponentNum, clearComponentNum } = slice.actions;
export default slice.reducer;
