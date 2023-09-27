import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedId: [],
};

const slice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    clearSelectedId: (state) => {
      state.selectedId = [];
    },
  },
});

// Reducer
export const { setSelectedId, clearSelectedId } = slice.actions;
export default slice.reducer;
