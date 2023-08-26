import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedId: [],
  mileageCategoryList: [],
  mileageGlobalList: [],
  mileageSemesterList: [],
};

const slice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    clearSelectedId: (state) => {
      state.selectedId = [];
    },

    setMileageCategoryList: (state, action) => {
      state.mileageCategoryList = action.payload;
    },
    setMileageGlobalList: (state, action) => {
      state.mileageGlobalList = action.payload;
    },
    setMileageSemesterList: (state, action) => {
      state.mileageSemesterList = action.payload;
    },
  },
});

// Reducer
export const {
  setSelectedId,
  clearSelectedId,
  setMileageCategoryList,
  setMileageGlobalList,
  setMileageSemesterList,
} = slice.actions;
export default slice.reducer;
