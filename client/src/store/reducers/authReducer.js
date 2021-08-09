import { LOGGED_IN, LOG_OUT, VERIFY_USER } from "../../types";

const initialState = {
    isAuth: false,
    user: {}
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case LOGGED_IN:
            return {
                ...state,
                isAuth: true,
                user: action.payload
            }    
        case LOG_OUT:
            return {
                ...state,
                isAuth: false,
                user: {}
            }
        case VERIFY_USER:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}