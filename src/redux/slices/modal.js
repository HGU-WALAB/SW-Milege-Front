import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  modalType: null,
  beforeData: null,
  clickedItemId: null,
  studentList: [],
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
    setBeforeData: (state, action) => {
      state.beforeData = action.payload;
    },
    setClickedItemId: (state, action) => {
      state.clickedItemId = action.payload;
    },
    setStudentList: (state, action) => {
      state.studentList = action.payload;
    },
  },
});

// Reducer
export const { openModal, closeModal, setBeforeData, setClickedItemId, setStudentList } =
  slice.actions;
export default slice.reducer;
