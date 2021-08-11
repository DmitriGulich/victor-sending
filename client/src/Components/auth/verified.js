import axios from 'axios';
import React, { useState } from 'react';

const Verified = (props) => {
    const [loading, setLoading] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    if (props.match.path === "/verify/:confirmationCode") {
        setLoading(true);
        axios.get("/auth/verify/" + code)
            .then(
                response => {
                    if(response.data.status === 'success'){
                        setConfirmed(true);
                        setLoading(false);
                    }
                }
            )
            .catch(error => {
                setConfirmed(false)
                setLoading(false);
            });
    }

    return ( 
        <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
            <div className="signin d-flex justify-content-center">
                <div className="col-8 pt-5 pb-5">
                    {loading ? (<></>) : confirmed ? (<></>) :
                        (<>
                            <h1>Account confirmed!</h1>
                            <p style={{color: '#8C9096'}}>
                                Hi, {username}. <br />
                                Your account is successfully confirmed. <Link to="/login">Please Login</Link>
                            </p>
                        </>
                        )}
                </div>
            </div>
        </div>
     );
}
 
export default Verified;