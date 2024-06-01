import {ActionType} from '../action-types';

const initialState = {
  errorMessages: [],
};

const reducer = (
  state = initialState,
  action
) => {
  if (action.type === ActionType.SET_SET_ERROR_MESSAGES) {
    return {
      ...state,
      errorMessages: action.payload
    };
  } else {
    return state;
  }
};

export default reducer;
