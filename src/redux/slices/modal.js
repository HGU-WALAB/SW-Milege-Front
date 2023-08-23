import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  modalType: null,
};

const slice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.modalType = action.payload;
    },
    closeModal: (state, action) => {
      state.isOpen = false;
      state.modalType = action.payload;
    },
  },
});

// Reducer
export const { openModal, closeModal } = slice.actions;
export default slice.reducer;
