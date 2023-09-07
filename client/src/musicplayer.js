import { Link } from 'react-router-dom';
import Dock from './dock';
import './musicplayer.css';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import MusicBtn from './components/MusicBtn';
import NavList from './components/NavList';
import axios from 'axios';

function MusicPlayer() {
  const myAudio = useRef(null);
  const audioSource = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Connect FE & BE Server
  useEffect(() => {
    axios.get('http://localhost:3300/musicPlayer')
      .then(response => {
        console.log('Received from backend:', response.data);
      })
      .catch(error => {
        console.error('Error fetching data from backend:', error);
      });
  }, []);

  const [musicList, setMusicList] = useState([
    {
      id: 1,
      face: '/musicFace/AuldLangSyne.jpg',
      song: 'songs/AuldLangSyne.mp3',
      name: 'Auld Lang Syne',
      active: false,
      tags: ['All', 'Ensembles'],
    },
    {
      id: 2,
      face: '/musicFace/Bleu.jpg',
      song: 'songs/Bleu.mp3',
      name: 'Bleu',
      active: false,
      tags: ['All', 'Rhythmic'],
    },
    {
      id: 3,
      face: '/musicFace/CanonInD.jpg',
      song: 'songs/CanonInD.mp3',
      name: 'Canon In D',
      active: false,
      tags: ['All', 'Classical'],
    },
    {
      id: 4,
      face: '/musicFace/RelaxingRain.jpg',
      song: 'songs/RelaxingRain.mp3',
      name: 'Relaxing Rain',
      active: false,
      tags: ['All', 'Natural Sound'],
    },
    {
      id: 5,
      face: '/musicFace/VocaliseOp34No14.jpg',
      song: 'songs/VocaliseOp34No14.mp3',
      name: 'Vocalise, Op34, No.14',
      active: false,
      tags: ['All', 'Vocal'],
    },
    {
      id: 6,
      face: '/musicFace/WhatMakesYouBeautiful.jpg',
      song: 'songs/WhatMakesYouBeautiful.mp3',
      name: 'What Makes You Beautiful',
      active: false,
      tags: ['All', 'Pop'],
    },
    {
      id: 7,
      face: '/musicFace/WinterBokeh.jpg',
      song: 'songs/WinterBokeh.mp3',
      name: 'Winter Bokeh',
      active: false,
      tags: ['All', 'Slow Smoothing'],
    },
  ]);

  const activeMusic = useMemo(() => musicList.find((item) => item.active) ?? '', [musicList]);

  /**
   * play song
   * @param songPath 
   */
  const playSong = (id) => {
    const activeMusic = musicList.find((item) => item.id === id) ?? '';

    const publicPath = process.env.PUBLIC_URL;
    const audioSourcePath = `${publicPath}/${activeMusic.song}`;

    audioSource.current.src = audioSourcePath;
    myAudio.current.load();
    myAudio.current.play();
    setIsPlaying(true);

    const newList = musicList.map((item) => {
      item.active = item.id === id;
      return item;
    });
    setMusicList(newList);
    return;
  };

  /**
   * Stop song
   */
  const stopSong = () => {
    myAudio.current.pause();
    setIsPlaying(false);
  };

  /**
   * Start song
   */
  const startSong = () => {
    myAudio.current.play();
    setIsPlaying(true);
  };

  const allTags = [...new Set(musicList.flatMap((musicItem) => musicItem.tags))];
  const [activeCategory, setActiveCategory] = useState(null); // 1. 创建筛选条件状态
  // 3. 处理筛选条件变化的函数
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="music-player-wrap">
      <div className="navbar-placeholder" />
      <audio id="myAudio" ref={myAudio}>
        <source id="audioSource" ref={audioSource} src="" type="audio/mpeg" />
      </audio>

      <div className="size-container relative">
        {/* <NavList></NavList> */}
        <NavList
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryChange}
          allTags={allTags}
        />


        <form className="search-container" action="/url" method="get">
          {/* <img src={"../public/navbar-bg.jpg"} alt="" className="w-25px" /> */}
          <input className="search-inp" type="text" placeholder="Search your music" />
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>
      </div>

      <div className="button-container music-btns-list">
        {musicList
          .filter((musicItem) => !activeCategory || musicItem.tags.includes(activeCategory))
          .map((musicItem) => (
            <MusicBtn
              onClick={() => playSong(musicItem.id)}
              key={musicItem.id}
              face={musicItem.face}
              name={musicItem.name}
            />
          ))}
      </div>


      <div className="dock-background">
        <div className="dock-buttons">
          <div className="dock-text">🎵 {activeMusic?.name ?? 'music'}</div>
          {isPlaying ? (
            <div className="dock-button toggle-play" onClick={stopSong}>
              ⏸️
            </div>
          ) : (
            <div className="dock-button toggle-play" onClick={() => startSong(activeMusic.song)}>
              ▶️
            </div>
          )}
          {/* <div className="dock-button toggle-volume">🔊</div> */}
        </div>
      </div>

      {/* <Dock /> */}
    </div>
  );
}

export default MusicPlayer;
