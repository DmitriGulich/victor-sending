import React, { useEffect } from 'react';
import LoginForm from './forms/loginForm';
import { SubmissionError } from "redux-form";
import axios from 'axios';

import { loginAction } from '../../store/actions/authActions';

import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';


const Login = () => {
    const { isAuth } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const onSubmit = (values) => {
      return axios.post('/auth/login', values)
      // .then(handleResponse)
         .then(response => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            const { data } = response;
            localStorage.clear();
            localStorage.setItem('token', data.accessToken);
            localStorage.setItem('username', data.username);
            localStorage.setItem('email', data.email);
            localStorage.setItem('id', data.id);
            dispatch(loginAction(data));
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
            } else if (data.msg === 'No user') {
               throw new SubmissionError({
                     email: 'cannot find user'
               });
            }
         });
    }

    return ( 
        isAuth ? (<Redirect to="/" />) : (<LoginForm onSubmit={onSubmit} />)
     );
}
 
export default Login;
