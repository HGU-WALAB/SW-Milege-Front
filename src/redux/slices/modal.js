import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAddMileageCategoryModal: false,
  isEditMileageCategoryModal: false,
};

const slice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    addMileageCategoryModalOpen: (state) => {
      state.isAddMileageCategoryModal = true;
    },
    addMileageCategoryModalClose: (state) => {
      state.isAddMileageCategoryModal = false;
    },

    editMileageCategoryModalOpen: (state) => {
      state.isEditMileageCategoryModal = true;
    },
    editMileageCategoryModalClose: (state) => {
      state.isEditMileageCategoryModal = false;
    },
  },
});

// Reducer
export const { addMileageCategoryModalOpen, addMileageCategoryModalClose } = slice.actions;
export default slice.reducer;
