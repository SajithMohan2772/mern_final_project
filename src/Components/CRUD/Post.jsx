import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Post = () => {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const sendToServer = () => {
        const token = localStorage.getItem('jwtToken');

        if (!token) {
            // Redirect to login page if the user is not authenticated
            navigate('/login');
            return;
        }

        // Set the Authorization header
        axios.defaults.headers.common['Authentication'] = 'Bearer ' + token;

        axios.post('http://localhost:5000/post-message', { message })
            .then(response => {
                setMessage(''); // Clearing the input field
                navigate('/getSpecificUserMsg');
            })
            .catch(error => {
                console.error('Error sending to server:', error.response.data.message);
            });
    };

    return (
        <div>
            <h2>Post to Database</h2>
            <input 
                type="text" 
                value={message}
                onChange={e => setMessage(e.target.value)}
            />
            <button onClick={sendToServer}>Send</button>
        </div>
    );
};

export default Post;
