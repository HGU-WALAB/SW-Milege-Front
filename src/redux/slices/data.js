import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mileageCategoryList: [],
};

const slice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setMileageCategoryList: (state, action) => {
      state.mileageCategoryList = action.payload;
    },
  },
});

// Reducer
export const { setMileageCategoryList } = slice.actions;
export default slice.reducer;
