import {combineReducers} from 'redux';
import isAuthenticatedReducer from './isAuthenticatedReducer'

const reducers = combineReducers({
    isAuthenticated: isAuthenticatedReducer,
});

export default reducers;
