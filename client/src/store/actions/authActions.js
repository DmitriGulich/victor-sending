import { LOGGED_IN, LOG_OUT, VERIFY_USER } from "../../types"

const loginAction = (user) => {
    
    return { 
        type: LOGGED_IN, 
        payload:user 
    } 
}

const logout = () => {
    return {
        type: LOG_OUT
    }
}

const verifyEmail = (user) => {
    return {
        type: VERIFY_USER,
        payload: user
    }
}

const setUserAction = (user) => {
    return { 
        type: LOGGED_IN, 
        payload:user 
    } 
}


export {
    loginAction,
    logout,
    verifyEmail,
    setUserAction
};