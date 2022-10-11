/* eslint-disable default-param-last */
const initialState = {
  filter: {
    range: '',
    option: { type: 'contains', value: '' },
  },
};

function rootReducers(state = initialState, action: any) {
  switch (action.type) {
    case 'SET_FILTER_RANGE':
      return {
        ...state,
        range: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducers;
