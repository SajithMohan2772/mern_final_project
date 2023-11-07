import React, { useState } from 'react';
import axios from 'axios';

const Delete = () => {
    const [id, setId] = useState(''); // Initialize with an empty string
    const [response, setResponse] = useState('');

    const deleteServerMessage = () => {
        if (id) {
            axios.delete(`http://localhost:5000/delete-message/${id}`)
                .then(() => {
                    setResponse('Message deleted successfully!');
                })
                .catch(() => {
                    setResponse('Error deleting message from server');
                });
        } else {
            setResponse('Please provide an ID.');
        }
    };

    return (
        <div>
            <h2>Delete Message from Database</h2>
            
            <input 
                type="text"
                placeholder="Enter ID to delete message"
                value={id}
                onChange={e => setId(e.target.value)}
            />

            <button onClick={deleteServerMessage}>Delete</button>
            <div>{response}</div>
        </div>
    );
};

export default Delete;
