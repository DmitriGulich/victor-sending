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

function login(values) {

    return axios.post('/auth/login', values)
        // .then(handleResponse)
        .then(response => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            const { data } = response;
            localStorage.setItem('token', data.accessToken);
            localStorage.setItem('username', data.username);
            localStorage.setItem('email', data.email);
            localStorage.setItem('id', data.id);
            return data;
        })
        .catch(error => {
            const { data } = error.response;
            if(data.msg === 'verify') {
                throw new SubmissionError({
                    email : 'please verify'
                });
            } else if (data.msg === 'unauthorized') {
                throw new SubmissionError({
                    password: 'incorrect password'
                });
            } else if (data.msg === 'no user') {
                throw new SubmissionError({
                    email: 'No user'
                });
            }
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}
