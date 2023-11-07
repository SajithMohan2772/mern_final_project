import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetSpecific = () => {
    const [content, setContent] = useState(''); // Initialize with an empty string
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (content) {
            axios.get(`http://localhost:5000/get-message/${content}`)
                .then(res => {
                    if (res.data.data.message) {
                        setMessage(res.data.data.message.message); // Assuming the message object has a 'message' field
                        setError('');
                    } else {
                        setError('Unexpected response format from server');
                        setMessage('');
                    }
                })
                .catch(() => {
                    setError('Error fetching message from server');
                    setMessage('');
                });
        }
    }, [content]);

    return (
        <div>
            <h2>Fetch Specific Message from Database</h2>
            
            <input 
                type="text"
                placeholder="Enter message content to fetch"
                value={content}
                onChange={e => setContent(e.target.value)}
            />

            {message && <p>Message: {message}</p>}
            {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
    );
};

export default GetSpecific;
