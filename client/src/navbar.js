import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';

const SearchComp = () => {
  return (
    <form className="search-container" action="/url" method="get">
      {/* <img src={"../public/navbar-bg.jpg"} alt="" className="w-25px" /> */}
      <input className="search-inp" type="text" placeholder="Search your music" />
      <button type="submit" className="search-btn">
        Search
      </button>
    </form>
  );
};

const NavLinks = () => {
  return (
    <div className="nav-links">
      <Link to="/" className="nav-link">
        🎵 Home
      </Link>
      <a href="/login" className="nav-link">
        👤 Log in
      </a>
    </div>
  );
};

function Navbar() {
  const route = useLocation();

  return (
    // <div className="navbar">{route.pathname === '/music' ? <SearchComp /> : <NavLinks />}</div>
    <div className={route.pathname === '/music' ? 'gap navbar' : 'navbar'}>
      <NavLinks />
    </div>
  );
}

export default Navbar;
