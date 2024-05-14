import {ActionType} from '../action-types';

const initialState = {
    birthdays: [],
};

const reducer = (
    state = initialState,
    action
) => {
    if (action.type === ActionType.SET_BIRTHDAYS) {
        return {
            ...state,
            birthdays: action.payload
        };
    } else {
        return state;
    }
};

export default reducer;
