// Dashboard.jsx
import React from 'react';
import About from './About';
import { NavLink, Routes, Route } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div>
      Dashboard Page
      
      <nav>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="about">About</NavLink>
      </nav>
      <Routes>
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}
