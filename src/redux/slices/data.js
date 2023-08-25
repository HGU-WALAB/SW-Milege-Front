import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mileageCategoryList: [],
  mileageGlobalList: [],
  mileageSemesterList: [],
};

const slice = createSlice({
  name: 'data',
  initialState,
  reducers: {
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
export const { setMileageCategoryList, setMileageGlobalList, setMileageSemesterList } =
  slice.actions;
export default slice.reducer;
