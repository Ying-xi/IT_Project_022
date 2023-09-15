import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './navbar'
import Homepage from './homepage'
import MusicPlayer from './musicplayer'
import Login from './login'
import Admin from './admin'
import Albums from './albums'
function App () {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/music' element={<MusicPlayer />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/albums' element={<Albums />} />
        </Routes>
        {/* <Dock /> */}
      </div>
    </Router>
  )
}

export default App
