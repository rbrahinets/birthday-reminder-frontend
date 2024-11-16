import {ActionType} from '../action-types';

const initialState = {
  birthday: {},
};

const reducer = (
  state = initialState,
  action
) => {
  if (action.type === ActionType.SET_BIRTHDAY) {
    return {
      ...state,
      birthday: action.payload
    };
  } else {
    return state;
  }
};

export default reducer;
