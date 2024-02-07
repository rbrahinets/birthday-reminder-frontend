import {ActionType} from '../action-types';

const initialState = {
    currentUser: {},
};

const reducer = (
    state = initialState,
    action
) => {
    if (action.type === ActionType.SET_CURRENT_USER) {
        return {
            ...state,
            currentUser: action.payload
        };
    } else {
        return state;
    }
};

export default reducer;
