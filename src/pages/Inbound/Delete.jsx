import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function DeleteInbound() {
    const { id } = useParams();
    const navigate = useNavigate();
    const instance = axios.create({
        baseURL: 'http://localhost:8000',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    });

    useEffect(() => {
        instance.delete(`/inbound/delete/${id}`)
            .then(res => {
                if (res.data.success) {
                    navigate('/inbound', { state: { message: res.data.message } });
                } else {
                    navigate('/inbound', { state: { message: 'Failed to delete the inbound item.' } });
                }
            })
            .catch(err => {
                if (err.response && err.response.status === 401) {
                    navigate('/login?message=' + encodeURIComponent('You are not logged in'));
                } else {
                    navigate('/inbound', { state: { message: 'Error deleting the inbound item.' } });
                }
            });
    }, [id, navigate]);

    return (
        <div>
            Deleting inbound item...
        </div>
    );
}
