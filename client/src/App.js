import './App.css';
import Navbar from './navbar';
import Homepage from './homepage';
import Dock from './dock';
import MusicPlayer from './musicPlayer';


// 先导入homepage，navbar和dock
// 然后用if判定，切换homepage和listen to music page

function App() {
  return (
    <div className="App">
      <Navbar />
      <Homepage />
      <Dock />
    </div>
  );
}


// function App() {
//   const [currentPage, setCurrentPage] = useState('homepage'); // 默认显示主页

//   const switchToHomepage = () => {
//     setCurrentPage('homepage');
//   };

//   const switchToMusicPlayer = () => {
//     setCurrentPage('musicPlayer');
//   };

//   return (
//     <div className="App">
//       <Navbar />
//       {currentPage === 'homepage' && <Homepage />}
//       {currentPage === 'musicPlayer' && <MusicPlayer />}
//       <Dock />

//       <div className="page-switch-buttons">
//         <button onClick={switchToHomepage}>Switch to Homepage</button>
//         <button onClick={switchToMusicPlayer}>Switch to Music Player</button>
//       </div>
//     </div>
//   );
// }



export default App;
