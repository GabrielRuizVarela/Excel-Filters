/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { WorkSheet } from 'xlsx';

export interface FilterState {
  id: number;
  filteredSheet: WorkSheet | null;
  branch: number;
  type: string;
  value: string;
  range: string;
  prev: number | null;
  display: boolean;
  mergeOptions?: 'stacked' | 'sideways';
  mergeInto?: number;
  merge?: boolean;
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
    branch: 0,
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
      if (state[action.payload].id !== 0) {
        state.splice(action.payload, 1);
      }
      // if prev is null and index is not 0, remove from state
      state.forEach((filter, index) => {
        // if filter.prev not match any id in state, delete filter
        if (filter.prev !== null) {
          const prev = state.find((f) => f.id === filter.prev);
          if (prev === undefined) {
            state.splice(index, 1);
          }
        }
      });
    },
    addFilter: (state: Array<FilterState>, action) => {
      let next = action.payload.index + 1;
      if (
        state[next]?.merge ||
        state[next]?.branch !== state[action.payload.index].branch
      ) {
        next += 1;
      }
      if (!action.payload.merge) {
        state.splice(next, 0, {
          type: 'contains',
          value: '',
          range: '',
          prev: state[action.payload.index].id,
          id: state.length,
          filteredSheet: state[action.payload.index].filteredSheet,
          display: true,
          branch: action.payload.branch,
        });
      } else {
        state.splice(next, 0, {
          type: 'contains',
          value: '',
          range: '',
          prev: state[action.payload.index].id,
          id: state.length,
          filteredSheet: state[action.payload.index].filteredSheet,
          display: true,
          branch: action.payload.branch,
          merge: true,
          mergeInto: 0,
          mergeOptions: 'stacked',
        });
      }
      // display needs to be false in the others
      state.forEach((filter, i) => {
        if (i !== action.payload.index+1) {
          filter.display = false;
        }
      });
      // if (state[next + 1]) {
      //   state[next + 1].prev = state[next].id;
      // }
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
    updateOptions: (state: Array<FilterState>, action) => {
      state[action.payload.index].mergeOptions = action.payload.options;
    },

    updateMergeInto: (state: Array<FilterState>, action) => {
      state[action.payload.index].mergeInto = action.payload.mergeInto;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateFilteredSheet,
  updateValue,
  updateRange,
  updateType,
  removeFilter,
  addFilter,
  updateDisplay,
  updateOptions,
  updateMergeInto,
} = filterSlice.actions;

export default filterSlice.reducer;
