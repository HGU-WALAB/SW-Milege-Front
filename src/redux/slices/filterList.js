import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  typeList: [],
  categoryList: [],
  allMileageList: [],
  semesterList: [], // 애매
  itemList: [],
  detailedItemBySemesterList: [],
  studentList: [],
  adminList: [],
  selectedItemList: [],
};

const slice = createSlice({
  name: 'filterList',
  initialState,
  reducers: {
    setTypeList: (state, action) => {
      state.typeList = action.payload;
    },
    setCategoryList: (state, action) => {
      state.categoryList = action.payload;
    },
    setSemesterList: (state, action) => {
      state.semesterList = action.payload;
    },
    setItemList: (state, action) => {
      state.itemList = action.payload;
    },
    setDetailedItemBySemesterList: (state, action) => {
      state.detailedItemBySemesterList = action.payload;
    },

    setStudentList: (state, action) => {
      state.studentList = action.payload;
    },
    setAdminList: (state, action) => {
      state.adminList = action.payload;
    },
    setSelectedItemList: (state, action) => {
      state.selectedItemList = action.payload;
    },
    resetSelectedItemList: (state) => {
      state.selectedItemList = [];
    },
    // 세부 항목 이름 중복 방지를 위해 전체 마일리지 리스트를 따로 저장
    setAllMileageList: (state, action) => {
      state.allMileageList = action.payload;
    },
  },
});

// Reducer
export const {
  setTypeList,
  setCategoryList,
  setSemesterList,
  setItemList,
  setDetailedItemBySemesterList,
  setStudentList,
  setAdminList,
  setSelectedItemList,
  resetSelectedItemList,
  setAllMileageList,
} = slice.actions;
export default slice.reducer;
