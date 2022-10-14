/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from '../../app/store';

interface FilterState {
  type: string;
  value: string;
  range: string;
  sheet: string;
}

const initialState = {
  type: 'contains',
  value: '',
  range: '',
  sheet: '',
} as FilterState;

export const filterSlice = createSlice({
  name: 'Filter',
  initialState,
  reducers: {
    updateValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    updateRange: (state, action: PayloadAction<string>) => {
      state.range = action.payload;
    },
    updateType: (state, action) => {
      state.type = action.payload;
    },
    updateSheet: (state, action) => {
      state.sheet = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateValue, updateRange, updateType, updateSheet } =
  filterSlice.actions;

export default filterSlice.reducer;
