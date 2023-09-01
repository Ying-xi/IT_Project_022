import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' // 注意多了一个 Routes 的导入
import Navbar from './navbar'
import Homepage from './homepage'
import MusicPlayer from './musicplayer'

function App () {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/music' element={<MusicPlayer />} />
        </Routes>
        {/* <Dock /> */}
      </div>
    </Router>
  )
}

export default App

// function App() {
//   const [currentPage, setCurrentPage] = useState('homepage'); // 默认显示主页

//   const switchToHomepage = () => {
//     setCurrentPage('homepage');
//   };

//   const switchToMusicPlayer = () => {
//     setCurrentPage('musicplayer');
//   };

//   return (
//     <div className="App">
//       <Navbar />
//       {currentPage === 'homepage' && <Homepage />}
//       {currentPage === 'musicplayer' && <MusicPlayer />}
//       <Dock />

//       <div className="page-switch-buttons">
//         <button onClick={switchToHomepage}>Switch to Homepage</button>
//         <button onClick={switchToMusicPlayer}>Switch to Music Player</button>
//       </div>
//     </div>
//   );
// }
