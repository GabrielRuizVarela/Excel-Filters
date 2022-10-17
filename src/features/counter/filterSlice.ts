/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
// import type { RootState } from '../../app/store';

interface FilterState {
  type: string;
  value: string;
  range: string;
  sheet: string;
}

interface actionType {
  payload: {
    action: string;
    index: number;
  }
}

const initialState = [
  {
    type: 'contains',
    value: '',
    range: '',
    sheet: '',
  },
] as Array<FilterState>;

export const filterSlice = createSlice({
  name: 'Filter',
  initialState,
  reducers: {
    updateValue: (
      state: Array<FilterState>,
      action: actionType,
    ) => {
      state[action.payload.index].value = action.payload.action;
    },
    updateRange: (state: Array<FilterState>, action: actionType) => {
      state[action.payload.index].range = action.payload.action;
    },
    updateSheet: (state: Array<FilterState>, action: actionType) => {
      state[action.payload.index].sheet = action.payload.action;
    },
    updateType: (state: Array<FilterState>, action: actionType) => {
      state[action.payload.index].type = action.payload.action;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateValue, updateRange, updateType, updateSheet } =
  filterSlice.actions;

export default filterSlice.reducer;
