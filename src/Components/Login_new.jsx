import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);  // New state to track successful login
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setError('');  // Reset error on change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/login', formData).then(res => {
                localStorage.setItem('jwtToken', res.data.token);

                const decodedToken = jwtDecode(res.data.token);  // Decode the token
                const userRole = decodedToken.role;  // Extract the role

                console.log('Login successful');
                setError('');
                setSuccess(true);

                // Check the role and navigate accordingly
                switch (userRole) {  // Change this line to use userRole
                    case 'admin':
                        navigate('/getAll');
                        break;
                    case 'user':
                        navigate('/createPost');
                        break;
                    default:
                        console.error('Unknown role');
                        setError('Invalid role');
                }
            });
        } catch (err) {
            console.error('Login failed', err.response.data);
            setError(err.response.data.message);
            setSuccess(false);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </label><br />
                <label>
                    Password:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </label><br />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Login successful!</p>}  {/* Display success message */}
        </div>
    );
};

export default Login;
