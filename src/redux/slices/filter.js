import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: '전체',
  semester: '전체',
  isVisible: null,
};

const slice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    clearCategory: (state) => {
      state.category = '전체';
    },
    setSemester: (state, action) => {
      state.semester = action.payload;
    },
    clearSemester: (state) => {
      state.semester = '전체';
    },
    setIsVisible: (state, action) => {
      state.isVisible = action.payload;
    },
    clearIsVisible: (state) => {
      state.isVisible = null;
    },
  },
});

// Reducer
export const {
  setCategory,
  clearCategory,
  setSemester,
  clearSemester,
  setIsVisible,
  clearIsVisible,
} = slice.actions;
export default slice.reducer;
