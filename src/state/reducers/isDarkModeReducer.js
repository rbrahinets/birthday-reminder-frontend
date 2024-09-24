import {ActionType} from '../action-types';

const initialState = {
  isDarkMode: localStorage.getItem('isDarkMode') === 'dark',
};

const reducer = (
  state = initialState,
  action
) => {
  if (action.type === ActionType.IS_DARK_MODE) {
    return {
      ...state,
      isDarkMode: action.payload
    };
  } else {
    return state;
  }
};

export default reducer;
