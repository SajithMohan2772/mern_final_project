import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Get = () => {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('jwtToken'); // Replace with your token retrieval logic
        if (!token) {
            setError('User not logged in');
            return;
        }

        // Set the Authorization header
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

        axios.get('http://localhost:5000/get-message')
        .then(res => {
            if (res.data.status === 'success' && res.data.data.messages) {
                setMessages(res.data.data.messages);
            } else {
                setError('Unexpected response format from server');
            }
        })
        .catch(err => {
            // Check if it's an authorization error
            if (err.response && err.response.status === 403) {
                setError('Access denied');
            } else {
                setError('Error fetching from server');
            }
        });
    }, []);

    return (
        <div>
            <h2>Retrieve from Database:</h2>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message.message}</li>
                ))}
            </ul>
        </div>
    );
};

export default Get;
