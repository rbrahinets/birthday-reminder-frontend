import {ActionType} from '../action-types';

const initialState = {
  isBirthdayInfoMode: true,
};

const reducer = (
  state = initialState,
  action
) => {
  if (action.type === ActionType.SET_IS_BIRTHDAY_INFO_MODE) {
    return {
      ...state,
      isBirthdayInfoMode: action.payload
    };
  } else {
    return state;
  }
};

export default reducer;
