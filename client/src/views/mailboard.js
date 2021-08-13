import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setSmtp } from '../store/actions/smtpActions';
import MailEditForm from '../Components/mailboard/mailEditForm';
import { sendMail } from '../_services/smtp.service';
import Swal from 'sweetalert2';

const Mailboard = () => {

    const smtp = useSelector(state => state.smtp);
    const dispatch = useDispatch();

    const renderSmtpSettings = (settings) => {
        if(settings !== null && settings !== undefined) {
            return (
                <div>
                    <div className="row mb-3">
                        <div className="col-3">
                            Host
                        </div>
                        <div className="col-8">
                            {settings.host}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-3">
                            Port
                        </div>
                        <div className="col-8">
                            {settings.port}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-3">
                            User
                        </div>
                        <div className="col-8">
                            {settings.user}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-3">
                            Email
                        </div>
                        <div className="col-8">
                            {settings.email}
                        </div>
                    </div>
                    
                </div>
            )
        } else {
            return (
                <div>
                    <h5>There is no SMTP setting.</h5>
                    <div className="row">
                    </div>
                </div>
            )
        }
    }
    
    const sendEmail = async (values) => {
        try {
            const response = await sendMail(values);
            Swal.fire({  
                icon: 'success',  
                title: 'email sent successfully.',  
                showConfirmButton: true,  
                confirmButtonText: 'Close'
              });  
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'cannot send email',
                icon: 'error',
                confirmButtonText: 'Close'
              })
        }
    }

    useEffect(() => {
        dispatch(setSmtp());
    }, []); 

    return ( 
        <div className="container">
            <div className="row">
                <div className="col-md-4 col-lg-4 col-sm-12">
                    <h4 className="mb-5">SMTP Setting</h4>
                    {renderSmtpSettings(smtp.settings)}
                </div>
                <div className="col-md-8 col-lg-8 col-sm-12">
                    <MailEditForm onSubmit={sendEmail} />
                </div>
            </div>
        </div>
     );
}
 
export default Mailboard;