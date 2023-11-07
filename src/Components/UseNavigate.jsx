import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UseNavigate() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Simulating a login action
    setIsLoggedIn(true);

    // Navigate to another route after login
    navigate('/dashboard');
  }

  return (
    <div>
      {
        !isLoggedIn ? 
        <button onClick={handleLogin}>Login</button>
        : 
        <p>You are now logged in!</p>
      }
    </div>
  );
}
