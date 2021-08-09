import axios from 'axios';

export default async function getUser () {
    const id = localStorage.getItem('id');
    
    return axios.get(`/api/user/${id}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'Application/json'
            }
        });

}