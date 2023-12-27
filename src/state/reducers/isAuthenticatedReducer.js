import {ActionType} from '../action-types';

const initialState = {
    isAuthenticated: false,
};

const reducer = (
    state = initialState,
    action
) => {
    if (action.type === ActionType.SET_IS_AUTHENTICATED) {
        return {
            ...state,
            isAuthenticated: action.payload
        };
    } else {
        return state;
    }
};

export default reducer;
