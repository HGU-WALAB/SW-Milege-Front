import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: '',
};

const slice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.category = action.payload;
    },
    clearFilter: (state) => {
      state.category = '';
    },
  },
});

// Reducer
export const { setFilter, clearFilter } = slice.actions;
export default slice.reducer;
