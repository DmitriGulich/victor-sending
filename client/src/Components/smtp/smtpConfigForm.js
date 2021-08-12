import React from 'react';
import { Field, reduxForm } from 'redux-form';
import renderField from '../../utils/renderField';

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
})(SmtpConfigForm);

export default SmtpConfigForm;