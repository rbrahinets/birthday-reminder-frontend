import {ActionType} from '../action-types';

const initialState = {
  language: localStorage.getItem('language') || 'English',
};

const reducer = (
  state = initialState,
  action
) => {
  if (action.type === ActionType.LANGUAGE) {
    return {
      ...state,
      language: action.payload
    };
  } else {
    return state;
  }
};

export default reducer;
