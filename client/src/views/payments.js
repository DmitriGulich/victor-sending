import React from 'react';
import PaypalForm from '../Components/payments/paypal/paypal';
import StripeContainer from '../Components/payments/stripe/stripContainer';
import { Modal, Button } from 'react-bootstrap';

const Payments = (props) => {
    return ( 
        <Modal
        {...props}
        backdrop="static"
        keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>What do you perfer to pay?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="body">
                    <StripeContainer />
                    <PaypalForm />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
     );
}
 
export default Payments;