import { SMTP_UPDATED, SET_SMTP } from '../../types';
import { getSmtpSettings } from '../../_services/smtp.service';

const smtpUpdated = () => {

}

const setSmtp = () => {
    const success = (smtpSettings) => {
        return {
            type: SET_SMTP,
            payload: smtpSettings
        }
    }

    return dispatch => {
        getSmtpSettings()
            .then(response => {
                dispatch(success(response.data.smtp));
            })
            
    }

}

export {
    setSmtp
}