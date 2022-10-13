/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from '../../app/store';
import xlsx from 'xlsx';

interface FileState {
  woorkbook: xlsx.WorkBook | null;
}
const initialState = {
  woorbook: null,
} as unknown as FileState;

export const fileSlice = createSlice({
  name: 'File',
  initialState,
  reducers: {
    updateFile: (state, action: PayloadAction<xlsx.WorkBook>) => {
      state.woorkbook = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateFile } = fileSlice.actions;

export default fileSlice.reducer;
