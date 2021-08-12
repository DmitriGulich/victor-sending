import React from 'react';
import PaypalForm from '../Components/payments/paypal/paypal';
import StripeContainer from '../Components/payments/stripe/stripContainer';


const Payments = () => {
    return ( 
        <div>
            <StripeContainer />
            <PaypalForm />
        </div>
     );
}
 
export default Payments;