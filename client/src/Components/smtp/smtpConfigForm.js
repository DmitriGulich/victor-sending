import React from 'react';
import { Field, reduxForm } from 'redux-form';
import renderField from '../../utils/renderField';

const validate = values => {
    const errors = {};
    if (!values.host) {
        errors.host = 'Required';
    } 

    if (!values.port) {
        errors.port = 'Required';
    } else if (/^\d*$/.test(values.port)) {
        errors.port = 'Must be number';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.user) {
        errors.user = 'Required';
    } 

    if(!values.password){
        errors.password = 'Required';
    } 
    
    if(!values.passwordConfirm) {
        errors.passwordConfirm = 'Please confirm the password';
    } 
    
    return errors;
}

let SmtpConfigForm = (props) => {
    const { errors, handleSubmit, pristine, submitting } = props;

    return ( 
        <div className="container">
            <div className="d-flex justify-content-center">
                <div className="signup col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <div>
                                <Field
                                    label="Host"
                                    name="host"
                                    component={renderField}
                                    type="text"
                                    placeholder="Email Host"
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div>
                                <Field
                                    label="Port"
                                    name="port"
                                    component={renderField}
                                    type="text"
                                    placeholder="Port Number"
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div>
                                <Field
                                    label="User"
                                    name="user"
                                    component={renderField}
                                    type="text"
                                    placeholder="user name"
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div>
                                <Field
                                    label="Email"
                                    name="email"
                                    component={renderField}
                                    type="text"
                                    placeholder="email address"
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
                                    placeholder="password"
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div>
                                <Field
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    component={renderField}
                                    type="password"
                                    placeholder="please confirm your password"
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <Field
                                    name="secure"
                                    id="secure"
                                    component="input"
                                    type="checkbox"
                                    className="custom-control-input"
                                    checked
                                    />
                                <label className="custom-control-label" htmlFor="secure">Is Secure?</label>
                            </div>      
                        </div>
                        
                        <div>
                            <button disabled={pristine || submitting} type="submit" className="btn btn-success mt-3">Save SMTP Settings</button>
                        </div>
                    </form>                 
                </div>
            </div>
        </div>
     );
}

SmtpConfigForm = reduxForm({
    form: 'smtpForm',
    validate
})(SmtpConfigForm);

export default SmtpConfigForm;