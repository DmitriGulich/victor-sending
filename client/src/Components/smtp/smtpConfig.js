import React from 'react';
import SmtpConfigForm from './smtpConfigForm';
import Swal from 'sweetalert2'

import { setStmpSettings } from '../../_services/smtp.service';
import { useSelector } from 'react-redux';

const SmtpConfig = () => {

    const smtp = useSelector(state => state.smtp);

    const onSubmit = (values) => {
        setStmpSettings(values, smtp)
            .then(response => {
                Swal.fire({  
                    icon: 'success',  
                    title: 'SMTP setting has been saved',  
                    showConfirmButton: true,  
                    confirmButtonText: 'Close'
                  });  
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error!',
                    text: 'cannot set SMTP settings',
                    icon: 'error',
                    confirmButtonText: 'Close'
                  })
            });
    }

    return ( 
        <div>
            <SmtpConfigForm onSubmit={onSubmit} />
        </div>
     );
}
 
export default SmtpConfig;