import {combineReducers} from 'redux';
import isVisibleSignInModalReducer from './isVisibleSignInModalReducer';
import isVisibleSignUpModalReducer from './isVisibleSignUpModalReducer';
import isVisibleWaitModalReducer from './isVisibleWaitModalReducer';
import errorMessagesReducer from './errorMessagesReducer'
import isAuthenticatedReducer from './isAuthenticatedReducer'
import friendsReducer from './friendsReducer'
import loadingReducer from './loadingReducer';

const reducers = combineReducers({
    isVisibleSignInModal: isVisibleSignInModalReducer,
    isVisibleSignUpModal: isVisibleSignUpModalReducer,
    isVisibleWaitModal: isVisibleWaitModalReducer,
    errorMessages: errorMessagesReducer,
    isAuthenticated: isAuthenticatedReducer,
    friends: friendsReducer,
    loading: loadingReducer,
});

export default reducers;
