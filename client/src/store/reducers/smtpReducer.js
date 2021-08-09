import { SMTP_UPDATED, SET_SMTP } from '../../types';

const initialState = {
    isUpdated: false,
    settings: null
}

export default function smtpReducer(state = initialState, action) {
    switch(action.type) {
        case SMTP_UPDATED: 
            return {
                ...state,
                isUpdated: true
            }
        case SET_SMTP:
            return {
                ...state,
                isUpdated: false,
                settings: action.payload
            }
        default: 
            return state;
    }
}