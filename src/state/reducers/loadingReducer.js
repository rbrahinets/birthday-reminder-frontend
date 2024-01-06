import {ActionType} from '../action-types';

const initialState = {
    loading: true,
};

const reducer = (
    state = initialState,
    action
) => {
    if (action.type === ActionType.SET_LOADING) {
        return {
            ...state,
            loading: action.payload
        };
    } else {
        return state;
    }
};

export default reducer;
