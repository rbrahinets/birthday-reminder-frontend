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

export const setErrorMessages = (errorMessages) => {
    return (dispatch) => {
        dispatch({
            type: ActionType.SET_SET_ERROR_MESSAGES,
            payload: errorMessages,
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

export const setFriends = (friends) => {
    return (dispatch) => {
        dispatch({
            type: ActionType.SET_FRIENDS,
            payload: friends,
        });
    };
};

export const setLoading = (loading) => {
    return (dispatch) => {
        dispatch({
            type: ActionType.SET_LOADING,
            payload: loading,
        });
    };
};

export const setCurrentUser = (currentUser) => {
    return (dispatch) => {
        dispatch({
            type: ActionType.SET_CURRENT_USER,
            payload: currentUser,
        });
    };
};

export const setFriend = (friend) => {
    return (dispatch) => {
        dispatch({
            type: ActionType.SET_FRIEND,
            payload: friend,
        });
    };
};

export const setProfileImage = (profileImage) => {
    return (dispatch) => {
        dispatch({
            type: ActionType.SET_PROFILE_IMAGE,
            payload: profileImage,
        });
    };
};

export const setPreviewProfileImage = (previewProfileImage) => {
    return (dispatch) => {
        dispatch({
            type: ActionType.SET_PREVIEW_PROFILE_IMAGE,
            payload: previewProfileImage,
        });
    };
};

export const setBirthdayImage = (birthdayImage) => {
    return (dispatch) => {
        dispatch({
            type: ActionType.SET_BIRTHDAY_IMAGE,
            payload: birthdayImage,
        });
    };
};

export const setPreviewBirthdayImage = (previewBirthdayImage) => {
    return (dispatch) => {
        dispatch({
            type: ActionType.SET_PREVIEW_BIRTHDAY_IMAGE,
            payload: previewBirthdayImage,
        });
    };
};
