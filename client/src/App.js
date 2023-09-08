import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './navbar'
import Homepage from './homepage'
import MusicPlayer from './musicplayer'
import Login from './login'

function App () {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/music' element={<MusicPlayer />} />
          <Route path='/login' element={<Login />} />
        </Routes>
        {/* <Dock /> */}
      </div>
    </Router>
  )
}

export default App
