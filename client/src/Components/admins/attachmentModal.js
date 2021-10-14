import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const AttachmentModal = (props) => {
    const { user } = props;
    return ( 
        <Modal
        {...props}
        backdrop="static"
        keyboard={false}
        size='lg'
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit User Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="body">
                    
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
 
export default AttachmentModal;