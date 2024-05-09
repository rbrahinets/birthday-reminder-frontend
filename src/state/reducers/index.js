import {combineReducers} from 'redux';
import isVisibleSignInModalReducer from './isVisibleSignInModalReducer';
import isVisibleSignUpModalReducer from './isVisibleSignUpModalReducer';
import isVisibleWaitModalReducer from './isVisibleWaitModalReducer';
import errorMessagesReducer from './errorMessagesReducer'
import isAuthenticatedReducer from './isAuthenticatedReducer'
import friendsReducer from './friendsReducer'
import loadingReducer from './loadingReducer';
import currentUserReducer from './currentUserReducer';
import friendReducer from './friendReducer';
import profileImageReducer from './profileImageReducer';
import previewProfileImageReducer from './previewProfileImageReducer';

const reducers = combineReducers({
    isVisibleSignInModal: isVisibleSignInModalReducer,
    isVisibleSignUpModal: isVisibleSignUpModalReducer,
    isVisibleWaitModal: isVisibleWaitModalReducer,
    errorMessages: errorMessagesReducer,
    isAuthenticated: isAuthenticatedReducer,
    friends: friendsReducer,
    loading: loadingReducer,
    currentUser: currentUserReducer,
    friend: friendReducer,
    profileImage: profileImageReducer,
    previewProfileImage: previewProfileImageReducer,
});

export default reducers;
