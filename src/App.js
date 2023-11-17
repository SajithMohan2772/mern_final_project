import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import About from './Components/About';
import Registration from './Components/Registration';
import LoginNew from './Components/Login_new';
import ProtectedRoutesJWT from './Components/ProtectedRoutesJWT.jsx';
import React from "react";
import UserDashboard from './Components/UserDashboard';
import AdminDashboard from './Components/AdminDashboard';
import LandingPage from './Components/LandingPage'; // Import the LandingPage component

function App() {
    return (
      <>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginNew />} /> 
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Registration />} />
            <Route element={<ProtectedRoutesJWT />}>
              <Route path="/dashboard/*" element={<Dashboard />} />
              <Route path="/userDashboard/*" element={<UserDashboard />} />
              <Route path="/adminDashboard/*" element={<AdminDashboard />} />
            </Route>
          </Routes>
          </Router>
      </>
    );
}

export default App;
