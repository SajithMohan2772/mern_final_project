import React from 'react';
import { NavLink } from 'react-router-dom';

export default function About() {
  return (
    <div className="container mt-5">
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

      <div className="mt-4">
        <h2>About Page</h2>
        <p>Welcome to our website's About Page. Here, we aim to provide you with information about our company, mission, and values.</p>
        <p>Our company strives to deliver high-quality services/products and prioritize customer satisfaction. We believe in innovation, teamwork, and dedication to achieve our goals.</p>
      </div>
    </div>
  );
}
