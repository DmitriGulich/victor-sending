import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';

const createRootReducer = (history) => 
    combineReducers({
        router: connectRouter(history),
        auth: authReducer,
        form: formReducer
    });

export default createRootReducer;