import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chartNum: 0,
};

const slice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    setChartNum: (state, action) => {
      state.chartNum = action.payload;
    },
  },
});

// Reducer
export const { setChartNum } = slice.actions;
export default slice.reducer;
