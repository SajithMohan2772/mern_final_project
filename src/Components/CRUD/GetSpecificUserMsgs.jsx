import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const GetSpecificUserMsgs = () => {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState('');
    const [newMessage, setNewMessage] = useState('');

    const isAdmin = () => {
        const token = localStorage.getItem('jwtToken');
        if (!token) return false;

        const decodedToken = jwtDecode(token); // Decode the token
        const userRole = decodedToken.role; // Extract the role

        return userRole === 'admin'; // Check if the user role is admin
    };

    // Function to fetch messages
    const fetchMessages = () => {
        const token = localStorage.getItem('jwtToken');

        if (!token) {
            setError('User not logged in');
            return;
        }

        axios.defaults.headers.common['Authentication'] = 'Bearer ' + token;

        axios.get('http://localhost:5000/user-message')
            .then(res => {
                if (res.data.data.messages) {
                    setMessages(res.data.data.messages);
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
    };
    
    useEffect(() => {
        fetchMessages();
        isAdmin();
    }, []);


    const handleEdit = (messageId, updatedMessage) => {
        if (messageId && updatedMessage) {
            axios.put(`http://localhost:5000/update-message/${messageId}`, { updatedMessage })
                .then(res => {
                    console.log('Message updated successfully:', res.data);
                    const updatedMessages = messages.map(msg => {
                        if (msg._id === messageId) {
                            return { ...msg, message: updatedMessage };
                        }
                        return msg;
                    });
                    setMessages(updatedMessages);
                })
                .catch(error => {
                    console.error('Error updating on server:', error);
                });
        } else {
            console.warn('Please provide both ID and updated message.');
        }
    };

    const handleDelete = (messageId) => {
        axios.delete(`http://localhost:5000/delete-message/${messageId}`)
            .then(res => {
                console.log('Message deleted successfully:', res.data);
                const updatedMessages = messages.filter(msg => msg._id !== messageId);
                setMessages(updatedMessages);
            })
            .catch(error => {
                console.error('Error deleting on server:', error);
            });
    };

    const sendToServer = () => {
        if (newMessage) {
            axios.post('http://localhost:5000/post-message', { message: newMessage })
                .then(res => {
                    console.log('Message posted successfully:', res.data);
                    setNewMessage('');

                    fetchMessages();
                })
                .catch(error => {
                    console.error('Error posting message:', error);
                });
        } else {
            console.warn('Please provide a message to send.');
        }
    };

    return (
        <div>
        <h2>Fetch Your Messages from Database</h2>

        {messages.map((message, index) => (
    <div key={index}>
        <p>{message.message}</p>
        <div>
            {isAdmin() && (
                <>
                    <FontAwesomeIcon
                        icon={faEdit}
                        onClick={() => {
                            const updatedMessage = prompt('Enter updated message:', message.message);
                            if (updatedMessage !== null) {
                                handleEdit(message._id, updatedMessage);
                            }
                        }}
                        style={!isAdmin() ? { cursor: 'not-allowed', marginRight: '10px', opacity: 0.5 } : { cursor: 'pointer', marginRight: '10px' }}
                        disabled={!isAdmin()}
                    />
                    {isAdmin() && (
                        <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() => handleDelete(message._id)}
                            style={{ cursor: 'pointer' }}
                        />
                    )}
                </>
            )}
        </div>
    </div>
))}


            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div>
                <h2>Post to Database</h2>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={sendToServer}>Send</button>
            </div>
        </div>
    );
};

export default GetSpecificUserMsgs;
