import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <NavLink className="navbar-brand" to="/">Home</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login">Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/register">Register</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

function LandingPage() {
    return (
        <div>
            <Navigation />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <h1>Welcome to Real Estate Appointment Booking System</h1>
                        <p>Manage your location-based appointments efficiently!</p>
                    </div>
                    <div className="col-md-6">
                        {/* Add an image or any additional content here */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
