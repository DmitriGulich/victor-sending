import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';

const VerifyEmail = () => {
    const { user } = useSelector(state => state.auth);

    const email = user.email;
    const username = user.firstName + " " + user.lastName;
    
    const resend = (email, username) => {
        axios.post('/auth/resend', { email, username });
    }

    return ( 
        <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
            <div className="signin d-flex justify-content-center">
                <div className="col-8 pt-5 pb-5">
                    <h1>Verify your Email</h1>
                    <p style={{color: '#8C9096'}}>
                        Hi, {username}. <br />
                        We sent verification email to {email}.
                        Please verify your account. Didn't arrive email?
                    </p>
                    <button className="btn btn-warning" onClick={() => resend(email, username)}>Resend</button>
                </div>
            </div>
        </div>
     );
}
 
export default VerifyEmail;