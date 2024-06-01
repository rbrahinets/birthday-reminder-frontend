import {ActionType} from '../action-types';

const initialState = {
  isVisibleWaitModal: false,
};

const reducer = (
  state = initialState,
  action
) => {
  if (action.type === ActionType.SET_IS_VISIBLE_WAIT_MODAL) {
    return {
      ...state,
      isVisibleWaitModal: action.payload
    };
  } else {
    return state;
  }
};

export default reducer;
