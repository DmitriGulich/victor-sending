import { LOGGED_IN, LOG_OUT, VERIFY_USER } from "../../types"

const login = (user) => {
    
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
    login,
    logout,
    verifyEmail,
    setUserAction
};