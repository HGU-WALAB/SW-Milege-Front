import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryList: [],
  semesterList: [], // 애매
  itemList: [],
  studentList: [],
};

const slice = createSlice({
  name: 'filterList',
  initialState,
  reducers: {
    setCategoryList: (state, action) => {
      state.categoryList = action.payload;
    },
    setSemesterList: (state, action) => {
      state.semesterList = action.payload;
    },
    setItemList: (state, action) => {
      state.itemList = action.payload;
    },
    setStudentList: (state, action) => {
      state.studentList = action.payload;
    },
  },
});

// Reducer
export const { setCategoryList, setSemesterList, setItemList, setStudentList } = slice.actions;
export default slice.reducer;
