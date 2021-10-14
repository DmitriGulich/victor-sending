import React from 'react';  
import { Link } from "react-router-dom";
import { Field, reduxForm } from 'redux-form';
import renderField from '../../../utils/renderField';

const validate = values => {
    const errors = {};
    if(!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    if(!values.password){
        errors.password = 'Required';
    } else if (values.password.length < 8) {
        errors.password = 'password at least must be 8 characters';
    }
    return errors;
}

let LoginForm = (props) => {
    const { errors, handleSubmit, pristine, submitting } = props;
    return (
        <div className="d-flex justify-content-center align-items-center" style={{height: '90vh'}}>
            <div className="signin d-flex justify-content-center">
                <div className="col-6 mb-5">
                    <h1 className="m-5">Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <div>
                                <Field
                                    label="Email"
                                    name="email"
                                    component={renderField}
                                    type="text"
                                    placeholder="E-mail"
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div>
                                <Field
                                    label="Password"
                                    name="password"
                                    component={renderField}
                                    type="password"
                                    placeholder="Password"
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div>
                            <button disabled={pristine || submitting} type="submit" className="btn btn-success mt-3">Sign In</button>
                        </div>
                    </form>
                    <div 
                        className="mt-3 mb-3"
                        style={{textAlign: 'center'}}>
                        <Link to="/forgotPassword">Forgot Password?</Link>
                    </div>
                    <div 
                        className="mb-5"
                        style={{textAlign: 'center'}}>
                        <span className="mr-3">Don’t have an account?</span>
                        <Link to="/register">Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

LoginForm = reduxForm({
    form: 'loginForm',
    validate
})(LoginForm);

 
export default LoginForm;
