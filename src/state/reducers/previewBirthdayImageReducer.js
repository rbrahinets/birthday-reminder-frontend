import {ActionType} from '../action-types';

const initialState = {
  previewBirthdayImage: null,
};

const reducer = (
  state = initialState,
  action
) => {
  if (action.type === ActionType.SET_PREVIEW_BIRTHDAY_IMAGE) {
    return {
      ...state,
      previewBirthdayImage: action.payload
    };
  } else {
    return state;
  }
};

export default reducer;
