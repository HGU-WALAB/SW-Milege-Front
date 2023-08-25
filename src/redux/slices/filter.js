import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: '',
  semester: '',
};

const slice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    clearCategory: (state) => {
      state.category = undefined;
    },
    setSemester: (state, action) => {
      state.semester = action.payload;
    },
    clearSemester: (state) => {
      state.semester = undefined;
    },
  },
});

// Reducer
export const { setCategory, clearCategory, setSemester, clearSemester } = slice.actions;
export default slice.reducer;
