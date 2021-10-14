import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';

const VerifyEmail = () => {
    const { user } = useSelector(state => state.auth);

    const [ activated, setActivated ] = useState(false);

    const email = user.email;
    const username = user.firstName + " " + user.lastName;
    
    const resend = async (email, username) => {
        try {
            const response = await axios.post('/auth/resend', { email, username });
            if(response.data.msg === 'already activated'){
                setActivated(true);
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'cannot send request',
                icon: 'error',
                confirmButtonText: 'Close'
              });
        }
    }

    return ( 
        <>
            { activated ? (<Redirect to="/login" />) : (
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
                </div>)
            }
        </>
     );
}
 
export default VerifyEmail;