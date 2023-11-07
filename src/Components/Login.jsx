import React, { useContext, useState } from 'react';
import { UserContext } from './UserProvider';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

export default function Login() {
  const { login, error } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
//   const navigate = useNavigate(); // Initialize the useNavigate hook
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const loggedIn = login(username, password); // login function will now return true or false
    if (loggedIn) {
    //   navigate('/userProfile'); // Navigate to UserProfile route after successful login
    }
  };

  return (
    <div>
        <h1>useContext Example</h1>
        <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
