import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedId: [],
  mileageCategoryList: [],
  mileageGlobalList: [],
  mileageSemesterList: [],
  mode: null,
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
    setMode: (state, action) => {
      state.editingStudent = action.payload;
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
  setMode,
} = slice.actions;
export default slice.reducer;
