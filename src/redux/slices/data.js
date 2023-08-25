import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mileageCategoryList: [],
  mileageGlobalList: [],
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
  },
});

// Reducer
export const { setMileageCategoryList, setMileageGlobalList } = slice.actions;
export default slice.reducer;
