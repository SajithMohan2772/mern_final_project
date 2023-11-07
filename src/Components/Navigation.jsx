import React from 'react'
import { NavLink  } from 'react-router-dom';

export default function Navigation() {
    return (
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/counter">Counter</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/posts/article1">Article 1</NavLink>
          <NavLink to="/posts/article2">Article 2</NavLink>
        </nav>
      );
}
