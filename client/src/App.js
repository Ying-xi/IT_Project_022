import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './navbar'
import Homepage from './homepage'
import MusicPlayer from './musicplayer'
import Login from './login'
import Admin from './admin'
import User from './user'
import Admin_playlist from "./admin_playlist";
import Albums from './albums'
import Comments from './comments'
import Keyboard from './keyboard'


function App() {
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
                    <Route path='/keyboard' element={<Keyboard />} />
                    <Route path='/admin_playlist' element={<Admin_playlist />}/>
                    <Route path='/albums/:musicIndex' element={<Comments />} />
                </Routes>
                {/* <Dock /> */}
            </div>
        </Router>
    )
}



export default App


