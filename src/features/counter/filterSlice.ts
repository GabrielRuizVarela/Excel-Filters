/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { WorkSheet } from 'xlsx';

interface FilterState {
  type: string;
  value: string;
  range: string;
  // prev: FilterState | null;
  prev: number | null;
  id: number;
  filteredSheet: WorkSheet | null;
  display: boolean;
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
    prev: null,
    id: 0,
    filteredSheet: null,
    display: true,
  },
] as Array<FilterState>;

export const filterSlice = createSlice({
  name: 'Filter',
  initialState,
  reducers: {
    updateFilteredSheet: (state: Array<FilterState>, action) => {
      state[action.payload.index].filteredSheet = action.payload.sheet;
    },
    updateValue: (state: Array<FilterState>, action: actionType) => {
      state[action.payload.index].value = action.payload.action;
    },
    updateRange: (state: Array<FilterState>, action: actionType) => {
      state[action.payload.index].range = action.payload.action;
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
        prev: state[action.payload].id,
        id: state.length,
        filteredSheet: state[action.payload].filteredSheet,
        display: true,
      });
      // display needs to be false in the others
      state.forEach((filter, index) => {
        if (index !== action.payload + 1) {
          filter.display = false;
        }
      });
      if (state[action.payload + 2]) {
        state[action.payload + 2].prev = state[action.payload + 1].id;
      }
    },
    updateDisplay: (state: Array<FilterState>, action) => {
      state[action.payload.index].display = action.payload.display;
      if (action.payload.display) {
        state.forEach((filter, index) => {
          if (index !== action.payload.index) {
            filter.display = false;
          }
        });
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateValue,
  updateRange,
  updateType,
  removeFilter,
  addFilter,
  updateFilteredSheet,
  updateDisplay,
} = filterSlice.actions;

export default filterSlice.reducer;
