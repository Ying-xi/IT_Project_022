import {Link} from 'react-router-dom'
import Dock from './dock'
import './musicplayer.css'
import React, {useEffect, useMemo, useRef, useState} from 'react'
import MusicBtn from './components/MusicBtn'
import NavList from './components/NavList'
import axios from 'axios'

function MusicPlayer() {
  const myAudio = useRef(null)
  const audioSource = useRef(null)
  const [isPlaying,
    setIsPlaying] = useState(false)

  const [backendData, setBackendData] = useState({
    data: [], // backend data
    activeId: null, // Actived music id
  });

  // Connect FE & BE Server
  useEffect(() => {
    axios
      .get('http://localhost:3300/musicPlayer')
      .then(response => {
        console.log('Received from backend:', response.data);
        setBackendData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data from backend:', error);
      });
  }, []);




  /**
   * play song
   * @param songPath
   */

  const playSong = (id) => {
    const activeMusic = backendData?.data.find((item) => item._id === id);
  
    if (activeMusic) {
      // pause the current music
      myAudio.current.pause();
  
      const audioSourcePath = `data:audio/mpeg;base64,${activeMusic.file}`;
  
      audioSource.current.src = audioSourcePath;
      myAudio.current.load();
      myAudio.current.play();
      setIsPlaying(true);
  
      setBackendData((prevData) => ({
        ...prevData,
        activeId: id,
      }));
    }
  
    // Update musicList state
    const newList = backendData?.data.map((item) => {
      item.active = item._id === id;
      return item;
    });
  
    // Update backendData
    if (backendData) {
      setBackendData({
        ...backendData,
        data: newList,
      });
    }
  };

  const activeMusic = useMemo(
    () => backendData?.data.find((item) => item._id === backendData.activeId) ?? '',
    [backendData]
  );


  /**
   * Stop song
   */
  const stopSong = () => {
    myAudio
      .current
      .pause()
    setIsPlaying(false)
  }

  /**
   * Start song
   */
  const startSong = () => {
    myAudio
      .current
      .play()
    setIsPlaying(true)
  }


  const allTags = useMemo(() => {
    const tagsArray = backendData?.data.flatMap((musicItem) => musicItem.tags) || [];
    return [...new Set(tagsArray)];
  }, [backendData]);

  const [activeCategory,
    setActiveCategory] = useState(null)
  const handleCategoryChange = (category) => {
    setActiveCategory(category)
  }

  return (
    <div className='music-player'>
      <div className='music-player-wrap'>
        <div className='navbar-placeholder'/>
        <audio id='myAudio' ref={myAudio}>
          <source id='audioSource' ref={audioSource} src='' type='audio/mpeg'/>
        </audio>

        <div className='size-container relative'>
          {/* <NavList></NavList> */}
          <NavList
            activeCategory={activeCategory}
            onCategoryClick={handleCategoryChange}
            allTags={allTags}
          />

          <form className='search-container' action='/url' method='get'>
            {/* <img src={"../public/navbar-bg.jpg"} alt="" className="w-25px" /> */}
            <input className='search-inp' type='text' placeholder='Search your music'/>
            <button type='submit' className='search-btn'>
              Search
            </button>
          </form>
        </div>

        <div className='button-container music-btns-list'>
          {backendData && backendData.data ? (
            backendData.data
              .filter((item) => !activeCategory || item.tags.includes(activeCategory))
              .map((item) => (
                <MusicBtn
                  onClick={() => playSong(item._id)}
                  key={item._id}
                  face={`data:image/jpeg;base64,${item.picture}`}
                  name={item.name}
                />
              ))
          ) : (
            <div>Loading...</div>
          )}
        </div>

        <div className='dock-background'>
          <div className='dock-buttons'>
            <div className='dock-text'>🎵 {activeMusic?.name ?? 'music'}</div>
            {isPlaying
              ? (
                <div className='dock-button toggle-play' onClick={stopSong}>
                  ⏸️
                </div>
              )
              : (
                <div
                  className='dock-button toggle-play'
                  onClick={() => startSong(activeMusic.song)}>
                  ▶️
                </div>
              )}
            {/* <div className="dock-button toggle-volume">🔊</div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MusicPlayer
