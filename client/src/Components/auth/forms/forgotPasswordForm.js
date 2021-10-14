import React from 'react';  
import { Link } from "react-router-dom";
import { Field, reduxForm } from 'redux-form';

let ForgotPasswordForm = (props) => {
    const { error, handleSubmit, pristine, reset, submitting, isAgree } = props;
    return (
        <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
            <div className="signin d-flex justify-content-center">
                <div className="col-6 mb-5">
                    <h3 className="mt-5 mb-5">Forgot your password?</h3>
                    <form onSubmit={handleSubmit}>
                        <label className="mb-4 forgot">Enter you registered email or phone number below 
to receive password reset instructions.</label>
                        <div className="form-group">
                            <div>
                            <Field
                                name="email"
                                component="input"
                                type="text"
                                placeholder="E-mail"
                                className="form-control"
                            />
                            </div>
                        </div>
                        <div>
                            <button disabled={pristine || submitting} type="submit" className="btn btn-success mt-3">Send Recovery Email</button>
                        </div>
                    </form>
                    <div 
                        className="mt-3 mb-5"
                        style={{textAlign: 'center'}}>
                        <span className="mr-3">Question? Email us at </span>
                        <Link to="/feedback">feedback@ourplatform.com</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

ForgotPasswordForm = reduxForm({form: 'forgotPasswordForm'})(ForgotPasswordForm);

 
export default ForgotPasswordForm;
