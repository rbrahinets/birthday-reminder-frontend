import {ActionType} from '../action-types';

const initialState = {
  isVisibleSignInModal: false,
};

const reducer = (
  state = initialState,
  action
) => {
  if (action.type === ActionType.SET_IS_VISIBLE_SIGN_IN_MODAL) {
    return {
      ...state,
      isVisibleSignInModal: action.payload
    };
  } else {
    return state;
  }
};

export default reducer;
