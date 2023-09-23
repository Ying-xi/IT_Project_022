import React from 'react'
import {Link} from 'react-router-dom'
import './homepage.css'

function Homepage() {
  return (
    <div className='homepage'>
      <Link to='/music' className='window'>
        <img src='/homepage/listen_music1.jpg' alt='#'/>
      </Link>
      <Link to='/admin' className='window'>
        <img src='/homepage/play_music1.jpg' alt='#'/>
      </Link>
      <Link to='/albums' className='window'>
        <img src='/homepage/playlist1.jpg' alt='#'/>
      </Link>
    </div>
  )
}

export default Homepage
