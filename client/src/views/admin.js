import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminBoard = () => {
    
    const [ users, setUsers ] = useState(null);

    useEffect(() => {
        const options = {
            url: '/admin/users',
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios(options)
            .then(response => {
                console.log(response.data.users);
                setUsers(response.data.users);
            })
            .catch(() => {
                console.log(users);
                users = null;
            });
    }, []);

    return ( 
        <div className="container">
            <div>
                {/* user table */}
                {users === null ? (<div><h3> There is no user.</h3></div>) : (<table className="table table-hover">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>Role</th>
                            <th>Free Count</th>
                            <th>Count</th>
                            <th>End Date</th>
                        </tr>
                        {
                        users.map((item, key) => {
                            return (
                                <tr key={key}>
                                    <td>{key+1}</td>
                                    <td>{item.firstName + " " + item.lastName}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.status}</td>
                                    <td>{item.role}</td>
                                    <td>{item.freeCount}</td>
                                    <td>{item.count}</td>
                                    <td>{item.endDate}</td>
                                </tr>
                            )
                        })}
                    </thead>
                </table>)}
            </div>
            <div>
                {/* finance */}
            </div>
            <div>
                {/* price table */}
            </div>
        </div>
     );
}
 
export default AdminBoard;