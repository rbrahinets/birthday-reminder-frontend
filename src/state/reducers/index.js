import {combineReducers} from 'redux';
import isVisibleSignInModalReducer from './isVisibleSignInModalReducer';
import isVisibleSignUpModalReducer from './isVisibleSignUpModalReducer';
import isVisibleWaitModalReducer from './isVisibleWaitModalReducer';
import errorMessagesReducer from './errorMessagesReducer'
import isAuthenticatedReducer from './isAuthenticatedReducer'
import birthdaysReducer from './birthdaysReducer'
import loadingReducer from './loadingReducer';
import currentUserReducer from './currentUserReducer';
import birthdayReducer from './birthdayReducer';
import profileImageReducer from './profileImageReducer';
import previewProfileImageReducer from './previewProfileImageReducer';
import birthdayImageReducer from './birthdayImageReducer';
import previewBirthdayImageReducer from './previewBirthdayImageReducer';

const reducers = combineReducers({
    isVisibleSignInModal: isVisibleSignInModalReducer,
    isVisibleSignUpModal: isVisibleSignUpModalReducer,
    isVisibleWaitModal: isVisibleWaitModalReducer,
    errorMessages: errorMessagesReducer,
    isAuthenticated: isAuthenticatedReducer,
    birthdays: birthdaysReducer,
    loading: loadingReducer,
    currentUser: currentUserReducer,
    birthday: birthdayReducer,
    profileImage: profileImageReducer,
    previewProfileImage: previewProfileImageReducer,
    birthdayImage: birthdayImageReducer,
    previewBirthdayImage: previewBirthdayImageReducer,
});

export default reducers;
