import React from 'react';  
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { Field, reduxForm, formValueSelector } from 'redux-form';
import renderField from '../../../utils/renderField';

const validate = values => {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = 'Required';
    } else if (values.firstName.length > 15) {
        errors.firstName = 'Must be 15 characters or less';
    }
    if (!values.lastName) {
        errors.lastName = 'Required';
    } else if (values.lastName.length > 15) {
        errors.lastName = 'Must be 15 characters or less';
    }
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    if (!values.phone) {
        errors.phone = 'Required';
    } else if (!/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/i.test(values.phone)) {
        errors.phone = 'Invalid phone number';
    }
    if(!values.password){
        errors.password = 'Required';
    } else if (values.password.length < 8) {
        errors.password = 'password at least must be 8 characters';
    }
    if(!values.passwordConfirm) {
        errors.passwordConfirm = 'Please confirm the password';
    } else if(values.passwordConfirm !== values.password) {
        errors.passwordConfirm = 'Password mismatch';
    }
    return errors;
}

const warn = values => {
    const warnings = {}
    if (values.age < 19) {
      warnings.age = 'Hmm, you seem a bit young...'
    }
    return warnings
  }


let RegisterForm = (props) => {
    const { errors, handleSubmit, pristine, reset, submitting, isAgree } = props;

    return (
        <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
            <div className="signup d-flex justify-content-center">
                <div className="col-7 mb-5">
                    <h1 className="m-4">Sign Up</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <div>
                            <Field
                                name="firstName"
                                label="First Name"
                                component={renderField}
                                type="text"
                                placeholder="First Name"
                                className="form-control"
                            />
                            </div>
                        </div>
                        <div className="form-group">
                            <div>
                            <Field
                                label="Last Name"
                                name="lastName"
                                component={renderField}
                                type="text"
                                placeholder="Last Name"
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
                                placeholder="E-mail"
                                className="form-control"
                            />
                            {/* {errors.email ? (<div className="input-error">{errors.email}</div>) : (<div></div>)} */}
                            </div>
                        </div>
                        <div className="form-group">
                            <div>
                            <Field
                                label="Phone"
                                name="phone"
                                component={renderField}
                                type="text"
                                placeholder="Phone Number"
                                className="form-control"
                            />
                            {/* {errors.email ? (<div className="input-error">{errors.email}</div>) : (<div></div>)} */}
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
                        <div className="form-group">
                            <div>
                            <Field
                                label="Confirm password"
                                name="passwordConfirm"
                                component={renderField}
                                type="password"
                                placeholder="Password Confirm"
                                className="form-control"
                            />
                            {/* {errors.passConfirm ? (<div className="input-error">{errors.passConfirm}</div>) : (<div></div>)} */}
                            </div>
                        </div>
                        <div>
                            <button disabled={pristine || submitting} type="submit" className="btn btn-success">Open an Account for Free</button>
                        </div>
                    </form>
                    <div 
                        className="mt-3 mb-5"
                        style={{textAlign: 'center'}}>
                        <span className="mr-3">Alreday have an account?</span>
                        <Link to="/login">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

RegisterForm = reduxForm({
    form: 'registerForm',
    validate,
    warn
})(RegisterForm);

// const selector = formValueSelector('registerForm') // <-- same as form name
// RegisterForm = connect(state => {
//   // can select values individually

//   const isAgree = selector(state, 'agree');
//   return {
//     isAgree,
//   }
// })(RegisterForm)
 
export default RegisterForm;
