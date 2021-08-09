import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import RegisterForm from "./forms/registerForm";
import { SubmissionError } from "redux-form";
import { useDispatch } from "react-redux";
import { verifyEmail } from "../../store/actions/authActions";
import axios from 'axios';

const Register = () => {
    
    const [registerStatus, setRegisterStatus] = useState(false);

    const dispatch = useDispatch();
    
    const onSubmit = (values) => {
        return axios.post('/auth/register', values)
            .then(response => {
                setRegisterStatus(true);
                dispatch(verifyEmail({
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email
                }));
            })
            .catch(error => {
                
                const errors = error.response.data.msg.errors;
                let submissionError = {};
                for (const element in errors) {
                    if(errors[element].path === 'password'){
                        submissionError[errors[element].path] = "password at least must be 8 characters";
                    } else {
                        submissionError[errors[element].path] = errors[element].message;
                    }
                }               
                throw new SubmissionError(submissionError);
            });
    };

    return ( 
        registerStatus ? (<Redirect to="/register/verify" />) : (<RegisterForm onSubmit={onSubmit}/>)
    );
}

export default Register;

