import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import AttachmentModal from './attachmentModal';

/**
 * TODO: 
 *  1. Add Loading Spinner!
 * @returns 
 */

const AttachmentRequest = () => {
    
    const [ requests, setRequests ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ attachLoading, setAttachLoading ] = useState(false);

    // get attachment requests
    useEffect(() => {
        const options = {
            url: '/admin/attach-req',
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        setLoading(true);
        axios(options)
            .then(response => {
                setRequests(response.data.requests);
                setLoading(false);
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error!',
                    text: `Cannot get request list\n${error.response.data}`,
                    icon: 'error',
                    confirmButtonText: 'Close'
                  });
            });
    }, []);

    const onUpdate = () => {
        
    }

    return ( 
        <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Request Time</th>
                        <th>Operation</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((item, key) => {
                        return (
                            <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.requestAt}</td>
                                <td>Edit | Update</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <AttachmentModal show={showModal} onHide={() => setModalShow(false)} />
        </div>
     );
}
 
export default AttachmentRequest;