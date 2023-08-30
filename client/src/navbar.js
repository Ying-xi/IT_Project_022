import React from 'react';
import { Link } from 'react-router-dom'; 
import './navbar.css';

function Navbar(){
    return (
        <div className="navbar">
            <Link to="/music" className="nav-link">🎵 Music</Link>
            <a href="#" className="nav-link">⚙ Setting</a>
            <a href="#" className="nav-link" style={{ marginRight: '5vh' }}>👤 Log In</a>
        </div>
    )
}

export default Navbar;
