import {ActionType} from '../action-types';

const initialState = {
  birthdayImage: null,
};

const reducer = (
  state = initialState,
  action
) => {
  if (action.type === ActionType.SET_BIRTHDAY_IMAGE) {
    return {
      ...state,
      birthdayImage: action.payload
    };
  } else {
    return state;
  }
};

export default reducer;
