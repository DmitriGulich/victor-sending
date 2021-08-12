import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

const Verified = (props) => {
    const [loading, setLoading] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    useEffect(() => {
        if (props.match.path === "/verify/:confirmationCode") {
        setLoading(true);
        const code = props.match.params.confirmationCode;
        console.log('verified.js 13');
        axios.get("/auth/verify/" + code)
            .then(
                response => {
                    if(response.data.status === 'success'){
                        setConfirmed(true);
                        window.location.href="/login";
                        setLoading(false);
                    }
                }
            )
            .catch(error => {
                setConfirmed(false)
                setLoading(false);
            });
        }
    }, []);


    return ( 
        <>
        {/* {confirmed ? (<Redirect to="/login" />) : (<div><div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
            <div className="signin d-flex justify-content-center">
                <div className="col-8 pt-5 pb-5">
                    {loading ? (<></>) : confirmed ? (<></>) :
                        (<>
                            <h1>Account confirmed!</h1>
                            <p style={{color: '#8C9096'}}>
                                Your account is successfully confirmed. <Link to="/login">Please Login</Link>
                            </p>
                        </>
                        )}
                </div>
            </div>
        </div></div>)} */}
        </>
     );
}
 
export default Verified;