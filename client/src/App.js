import './App.css';
import Navbar from './navbar';
import Homepage from './homepage';
import Dock from './dock';


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

export default App;
