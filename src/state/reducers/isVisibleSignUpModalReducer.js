import {ActionType} from '../action-types';

const initialState = {
    isVisibleSignUpModal: false,
};

const reducer = (
    state = initialState,
    action
) => {
    if (action.type === ActionType.SET_IS_VISIBLE_SIGN_UP_MODAL) {
        return {
            ...state,
            isVisibleSignUpModal: action.payload
        };
    } else {
        return state;
    }
};

export default reducer;
