import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAddMileageCategoryModal: false,
  isEditMileageCategoryModal: false,
};

const slice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    addMileageCategoryModalOpen: (state, action) => true,
    addMileageCategoryModalClose: (state, action) => false,
  },
});

// Reducer
export const { addMileageCategoryModalOpen, addMileageCategoryModalClose } = slice.actions;
export default slice.reducer;
