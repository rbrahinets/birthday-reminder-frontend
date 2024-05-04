import {ActionType} from '../action-types';

const initialState = {
    profileImage: null,
};

const reducer = (
    state = initialState,
    action
) => {
    if (action.type === ActionType.SET_PROFILE_IMAGE) {
        return {
            ...state,
            profileImage: action.payload
        };
    } else {
        return state;
    }
};

export default reducer;
