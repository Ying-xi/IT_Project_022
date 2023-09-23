import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

function Navbar() {
  return (
    <div className="navbar">
      <form className="search-container" action="/url" method="get">
        {/* <img src={"../public/navbar-bg.jpg"} alt="" className="w-25px" /> */}
        <input className="search-inp" type="text" placeholder="Search your music" />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>
      <div className="nav-links">
        <Link to="/" className="nav-link">
          🎵 Home
        </Link>
        <Link to="/login" className="nav-link">
          👤 Log in
          </Link>
      </div>
    </div>
  );
}

export default Navbar;
