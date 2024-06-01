import {ActionType} from '../action-types';

const initialState = {
  previewProfileImage: null,
};

const reducer = (
  state = initialState,
  action
) => {
  if (action.type === ActionType.SET_PREVIEW_PROFILE_IMAGE) {
    return {
      ...state,
      previewProfileImage: action.payload
    };
  } else {
    return state;
  }
};

export default reducer;
