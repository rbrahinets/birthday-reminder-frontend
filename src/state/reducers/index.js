import {combineReducers} from 'redux';
import isVisibleSignInModalReducer from './isVisibleSignInModalReducer';
import isAuthenticatedReducer from './isAuthenticatedReducer'

const reducers = combineReducers({
    isVisibleSignInModal: isVisibleSignInModalReducer,
    isVisibleSignUpModal: isVisibleSignUpModalReducer,
    isVisibleWaitModal: isVisibleWaitModalReducer,
    isAuthenticated: isAuthenticatedReducer,
});

export default reducers;
