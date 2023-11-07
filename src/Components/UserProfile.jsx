// UserProfile.js
import React, { useContext } from 'react';
import { UserContext } from './UserProvider';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const { user, logout } = useContext(UserContext);
//   const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // navigate('/');
  };

  return (
    <div>
      <h3>User Profile</h3>
      <p>Name: {user?.name || 'Not set'}</p>
      <p>Email: {user?.email || 'Not set'}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default UserProfile;
