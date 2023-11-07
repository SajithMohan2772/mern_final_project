import React, { useState } from 'react';
import axios from 'axios';

const Update = () => {
    const [id, setId] = useState(''); // Initialize with an empty string
    const [newMessage, setMessage] = useState('');

    const updateServerMessage = () => {
        if (id && newMessage) {
            axios.put(`http://localhost:5000/update-message/${id}`, { newMessage })
                .catch(error => {
                    console.error('Error updating on server:', error); // Log the error for debugging
                });
        } else {
            console.warn('Please provide both ID and message.'); // Log a warning if ID or message is missing
        }
    };

    return (
        <div>
            <h2>Update The Database</h2>
            
            <input 
                type="text"
                placeholder="Enter ID"
                value={id}
                onChange={e => setId(e.target.value)}
            />

            <input 
                type="text" 
                placeholder="Enter message"
                value={newMessage}
                onChange={e => setMessage(e.target.value)}
            />

            <button onClick={updateServerMessage}>Update</button>
        </div>
    );
};

export default Update;
