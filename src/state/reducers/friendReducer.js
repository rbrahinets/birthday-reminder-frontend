import {ActionType} from '../action-types';

const initialState = {
    currentUser: {},
};

const reducer = (
    state = initialState,
    action
) => {
    if (action.type === ActionType.SET_FRIEND) {
        return {
            ...state,
            friend: action.payload
        };
    } else {
        return state;
    }
};

export default reducer;
