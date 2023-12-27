import {ActionType} from '../action-types';

export const setIsVisibleSignInModal = (isVisibleSignInModal) => {
    return (dispatch) => {
        dispatch({
            type: ActionType.SET_IS_VISIBLE_SIGN_IN_MODAL,
            payload: isVisibleSignInModal,
        });
    };
};

export const setIsVisibleSignUpModal = (isVisibleSignUpModal) => {
    return (dispatch) => {
        dispatch({
            type: ActionType.SET_IS_VISIBLE_SIGN_UP_MODAL,
            payload: isVisibleSignUpModal,
        });
    };
};

export const setIsVisibleWaitModal = (isVisibleWaitModal) => {
    return (dispatch) => {
        dispatch({
            type: ActionType.SET_IS_VISIBLE_WAIT_MODAL,
            payload: isVisibleWaitModal,
        });
    };
};

export const setIsAuthenticated = (isAuthenticated) => {
    return (dispatch) => {
        dispatch({
            type: ActionType.SET_IS_AUTHENTICATED,
            payload: isAuthenticated,
        });
    };
};
