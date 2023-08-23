import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCategoryModal: false,
};

const slice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openCategoryModal: (state) => {
      state.isCategoryModal = true;
    },
    closeCategoryModal: (state) => {
      state.isCategoryModal = false;
    },
  },
});

// Reducer
export const { openCategoryModal, closeCategoryModal } = slice.actions;
export default slice.reducer;
