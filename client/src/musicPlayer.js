import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './musicPlayer.css';
import Dock from './dock';

function MusicPlayer() {
  const [modalContent, setModalContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const playSong = (songPath) => {
    const audio = document.getElementById('myAudio');
    const source = document.getElementById('audioSource');
    source.src = songPath;
    audio.load();
    audio.play();
    setIsPlaying(true);
  };

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const togglePlay = () => {
    const audio = document.getElementById('myAudio');
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div>

      <div className="navbar-placeholder" style={{ height: '5vh' }}></div>
      <audio id="myAudio">
        <source id="audioSource" src="" type="audio/mpeg" />
      </audio>

      <div className="size-container">
        <p className="text-container flex-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '45%' }}>
          Choose your music
        </p>

        <form className="search-container" action="/url" method="get">
          <input className="search-inp" type="text" placeholder="Search..." />
          <Link to="/" className="search-btn">
            返回
          </Link>
        </form>
      </div>
      <div className="button-container">
        <div className="button">
          <img src="rain.jpg" alt="音乐按钮" onClick={() => playSong('mona.mp3')} />
          <p className="music-item-text" onClick={() => openModal('弹窗内容1')}>name1</p>
        </div>
        {/* 其他按钮类似 */}
      </div>

      <div id="myModal" className={`modal ${isModalOpen ? 'show' : ''}`}>
        <div className="modal-content">
          <span id="modalText">{modalContent}</span>
          <button onClick={closeModal}>关闭</button>
        </div>
      </div>

      <Dock />
    </div>
  );
}

export default MusicPlayer;
