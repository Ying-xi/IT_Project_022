import React from 'react'
import './navbar.css'

function Navbar(){
    return (
        <div class="navbar">
            <a href="combination.html" className="nav-link"> &nbsp;&nbsp;Home&nbsp;&nbsp; </a>
            <a href="#" className="nav-link">⚙ Setting</a>
            <a href="#" className="nav-link" style={{ marginRight: '5vh' }}>👤 Log In</a>
        </div>
    )
}

export default Navbar;