import React, { useContext } from 'react'
import { UserContext } from './UserProvider';
import { Navigate,Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
    const { user } = useContext(UserContext); 
    // use useContext to consume UserContext

    if (!user) return <Navigate to="/" />; 
    // navigate to login if user is not authenticated
  
    return <Outlet />; // render children if user is authenticated
}

