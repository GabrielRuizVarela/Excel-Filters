/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface FileState {
//   workbook: WorkBook | null;
//   sheet: number;
//   id: number;
// }
const initialState = {
  user: null,
  loading: false,
  error: null,
  // sheet: 0,
  // id: 0,
};

export const firebaseSlice = createSlice({
  name: 'Firebase',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<any>) => {
      state = action.payload

    }
  },
});

// Action creators are generated for each case reducer function
export const { updateUser} =
  firebaseSlice.actions;

export default firebaseSlice.reducer;
