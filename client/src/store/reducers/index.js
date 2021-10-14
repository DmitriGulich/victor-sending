import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import smtpReducer from "./smtpReducer";

const createRootReducer = (history) => 
    combineReducers({
        router: connectRouter(history),
        auth: authReducer,
        smtp: smtpReducer,
        form: formReducer
    });

export default createRootReducer;