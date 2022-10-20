/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WorkBook } from 'xlsx';

interface FileState {
  workbook: WorkBook | null;
  sheet: number;
  id: number;
}
const initialState = {
  woorbook: null,
  sheet: 0,
  id: 0,
} as unknown as FileState;

export const fileSlice = createSlice({
  name: 'File',
  initialState,
  reducers: {
    updateFile: (state, action: PayloadAction<WorkBook>) => {
      state.workbook = action.payload;
    },
    updateSheet: (state, action: PayloadAction<number>) => {
      state.sheet = action.payload;
    },
    incrementIdCounter: (state) => {
      state.id += 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateFile, updateSheet, incrementIdCounter } =
  fileSlice.actions;

export default fileSlice.reducer;
