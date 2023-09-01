import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

function Navbar () {
  return (
    <div className='navbar'>
      <div className='nav-links'>
        <Link to='/' className='nav-link'>🎵 Home</Link>
        <a href='#' className='nav-link'>⚙ Setting</a>
        <a href='#' className='nav-link'>👤 Contact us</a>
      </div>
    </div>
  )
}

export default Navbar
