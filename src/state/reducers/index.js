import {combineReducers} from 'redux';
import isVisibleSignInModalReducer from './isVisibleSignInModalReducer';
import isVisibleSignUpModalReducer from './isVisibleSignUpModalReducer';
import isVisibleWaitModalReducer from './isVisibleWaitModalReducer';
import errorMessagesReducer from './errorMessagesReducer';
import isAuthenticatedReducer from './isAuthenticatedReducer';
import birthdaysReducer from './birthdaysReducer';
import currentUserReducer from './currentUserReducer';
import birthdayReducer from './birthdayReducer';
import profileImageReducer from './profileImageReducer';
import previewProfileImageReducer from './previewProfileImageReducer';
import birthdayImageReducer from './birthdayImageReducer';
import previewBirthdayImageReducer from './previewBirthdayImageReducer';
import isProfileInfoModeReducer from './isProfileInfoModeReducer';
import isBirthdayInfoModeReducer from './isBirthdayInfoModeReducer';
import isDarkModeReducer from './isDarkModeReducer';
import queryReducer from './queryReducer';

const reducers = combineReducers({
  isVisibleSignInModal: isVisibleSignInModalReducer,
  isVisibleSignUpModal: isVisibleSignUpModalReducer,
  isVisibleWaitModal: isVisibleWaitModalReducer,
  errorMessages: errorMessagesReducer,
  isAuthenticated: isAuthenticatedReducer,
  birthdays: birthdaysReducer,
  currentUser: currentUserReducer,
  birthday: birthdayReducer,
  profileImage: profileImageReducer,
  previewProfileImage: previewProfileImageReducer,
  birthdayImage: birthdayImageReducer,
  previewBirthdayImage: previewBirthdayImageReducer,
  isBirthdayInfoMode: isBirthdayInfoModeReducer,
  isProfileInfoMode: isProfileInfoModeReducer,
  isDarkMode: isDarkModeReducer,
  query: queryReducer,
});

export default reducers;
