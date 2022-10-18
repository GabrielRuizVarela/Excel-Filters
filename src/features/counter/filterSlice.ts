/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
// import type { RootState } from '../../app/store';

interface FilterState {
  type: string;
  value: string;
  range: string;
  sheet: string;
  prev: FilterState | null;
  id: number;
}

interface actionType {
  payload: {
    action: string;
    index: number;
  };
}

const initialState = [
  {
    type: 'contains',
    value: '',
    range: '',
    sheet: '',
    prev: null,
    id: 0,
  },
] as Array<FilterState>;

export const filterSlice = createSlice({
  name: 'Filter',
  initialState,
  reducers: {
    updateValue: (state: Array<FilterState>, action: actionType) => {
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
    removeFilter: (state, action) => {
      state.splice(action.payload, 1);
    },
    addFilter: (state: Array<FilterState>, action) => {
      state.splice(action.payload + 1, 0, {
        type: 'contains',
        value: '',
        range: '',
        sheet: '',
        prev: state[action.payload],
        id: state.length,
      });
      if(state[action.payload+2]){
        state[action.payload+2].prev = state[action.payload+1];
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateValue,
  updateRange,
  updateType,
  updateSheet,
  removeFilter,
  addFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
