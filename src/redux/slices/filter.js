import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: '전체',
  semester: '전체',
  isVisible: '전체',
  item: '전체',
  studentName: '전체',
  grade: '전체',
  department: '전체',
  level: '0',
  
};

const slice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    clearCategory: (state) => {
      state.category = '전체';
    },
    setSemester: (state, action) => {
      state.semester = action.payload;
    },
    clearSemester: (state) => {
      state.semester = '전체';
    },
    setIsVisible: (state, action) => {
      state.isVisible = action.payload;
    },
    clearIsVisible: (state) => {
      state.isVisible = '전체';
    },
    setItem: (state, action) => {
      state.item = action.payload;
    },
    clearItem: (state) => {
      state.item = '전체';
    },
    setStudentName: (state, action) => {
      state.studentName = action.payload;
    },
    clearStudentName: (state) => {
      state.studentName = '전체';
    },
    setGrade: (state, action) => {
      state.grade = action.payload;
    },
    clearGrade: (state) => {
      state.grade = '전체';
    },
    setDepartment: (state, action) => {
      state.department = action.payload;
    },
    clearDepartment: (state) => {
      state.department = '전체';
    },
    setLevel: (state, action) => {
      state.level = action.payload;
    },
    clearLevel: (state) => {
      state.level = '0';
    },
  },
});

// Reducer
export const {
  setCategory,
  clearCategory,
  setSemester,
  clearSemester,
  setIsVisible,
  clearIsVisible,
  setItem,
  clearItem,
  setStudentName,
  clearStudentName,
  setGrade,
  clearGrade,
  setDepartment,
  clearDepartment,
  setLevel,
  clearLevel,
} = slice.actions;
export default slice.reducer;
