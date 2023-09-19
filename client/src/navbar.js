import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

function Navbar () {
  return (
    <div className='navbar'>
      <div className='nav-links'>
        <Link to='/' className='nav-link'>🎵 Home</Link>
        <a href='#' className='nav-link'>⚙ Setting</a>
        <Link to='/login' className='nav-link'>👤 Admin</Link>
      </div>
    </div>
  )
}

export default Navbar
