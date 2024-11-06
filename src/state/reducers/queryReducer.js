import {ActionType} from '../action-types';

const initialState = {
  query: '',
};

const reducer = (
  state = initialState,
  action
) => {
  if (action.type === ActionType.SET_QUERY) {
    return {
      ...state,
      query: action.payload
    };
  } else {
    return state;
  }
};

export default reducer;
