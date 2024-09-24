import {ActionType} from '../action-types';

const initialState = {
  isProfileInfoMode: true,
};

const reducer = (
  state = initialState,
  action
) => {
  if (action.type === ActionType.SET_IS_PROFILE_INFO_MODE) {
    return {
      ...state,
      isProfileInfoMode: action.payload
    };
  } else {
    return state;
  }
};

export default reducer;
