import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetSpecificUserMsgs = () => {
    const [messages, setMessages] = useState([]);  // Updated to handle an array of messages
    const [error, setError] = useState('');

    
    useEffect(() => {
        const token = localStorage.getItem('jwtToken'); // Replace with your token retrieval logic
        if (!token) {
            setError('User not logged in');
            return;
        }
        
        // Set the Authorization header
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        axios.get(`http://localhost:5000/user-message`)
            .then(res => {
                if (res.data.data.messages) {
                    setMessages(res.data.data.messages.map(msg => msg.message));  // Directly setting array of messages
                    setError('');
                } else {
                    setError('Unexpected response format from server');
                    setMessages([]);
                }
            })
            .catch(() => {
                setError('Error fetching messages from server');
                setMessages([]);
            });
    }, []); 

    return (
        <div>
            <h2>Fetch Your Message from Database</h2>

            {messages.map((message, index) => <p key={index}>{message}</p>)} 
            {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
    );
};

export default GetSpecificUserMsgs;
