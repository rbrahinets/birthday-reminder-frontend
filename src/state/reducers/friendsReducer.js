import {ActionType} from '../action-types';

const initialState = {
    friends: [],
};

const reducer = (
    state = initialState,
    action
) => {
    if (action.type === ActionType.SET_FRIENDS) {
        return {
            ...state,
            friends: action.payload
        };
    } else {
        return state;
    }
};

export default reducer;
