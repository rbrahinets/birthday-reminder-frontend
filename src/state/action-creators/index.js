import {ActionType} from '../action-types';

export const setIsAuthenticated = (isAuthenticated) => {
    return (dispatch) => {
        dispatch({
            type: ActionType.SET_IS_AUTHENTICATED,
            payload: isAuthenticated,
        });
    };
};
