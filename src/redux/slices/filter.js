import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: '',
};

const slice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    clearCategory: (state) => {
      state.category = '';
    },
  },
});

// Reducer
export const { setCategory, clearCategory } = slice.actions;
export default slice.reducer;
