import {ActionType} from '../action-types';

const initialState = {
    previewImage: null,
};

const reducer = (
    state = initialState,
    action
) => {
    if (action.type === ActionType.SET_PREVIEW_IMAGE) {
        return {
            ...state,
            friend: action.payload
        };
    } else {
        return state;
    }
};

export default reducer;
