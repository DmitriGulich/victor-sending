import axios from 'axios';
import { SubmissionError } from 'redux-form';

export const userService = {
    login,
    logout,
    registerUser,
};

function registerUser (values) {
    return axios.post('/api/auth/register', values);
}

async function login(values) {

    try {
        const response = await axios.post('/auth/login', values);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        const { data } = response;
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('username', data.username);
        localStorage.setItem('email', data.email);
        localStorage.setItem('id', data.id);
        return data;
    } catch (error) {
        const { data: data_1 } = error.response;
        if (data_1.msg === 'verify') {
            throw new SubmissionError({
                email: 'please verify'
            });
        } else if (data_1.msg === 'unauthorized') {
            throw new SubmissionError({
                password: 'incorrect password'
            });
        } else if (data_1.msg === 'no user') {
            throw new SubmissionError({
                email: 'No user'
            });
        }
    }
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}
