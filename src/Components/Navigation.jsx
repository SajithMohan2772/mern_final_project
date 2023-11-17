import React from 'react'
import { NavLink  } from 'react-router-dom';

export default function Navigation() {
    return (
        <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
        </nav>
      );
}
