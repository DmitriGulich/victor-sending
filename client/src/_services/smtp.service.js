import axios from 'axios';

const getSmtpSettings = async () => {
    const token = localStorage.getItem('token');
    const options = {
        method: 'GET',
        url: '/smtp',
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    return await axios(options);
}

const setStmpSettings = async (setting, smtp) => {
    const token = localStorage.getItem('token');
    const method = smtp.setting === null ? 'POST' : 'PUT';

    const options = {
        method,
        url: '/smtp',
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: setting
    }
    return await axios(options);
}

const sendMail = async (contents) => {
    const token = localStorage.getItem('token');

    const options = {
        method : 'POST',
        url: '/smtp/send',
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: contents
    }
    return await axios(options);
}

export {
    getSmtpSettings,
    setStmpSettings,
    sendMail
}
