import { Link } from 'react-router-dom';
import Dock from './dock';
import './musicplayer.css';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import MusicBtn from './components/MusicBtn';
import NavList from './components/NavList';
import axios from 'axios';
import SearchComp from './components/SearchComp/index';

function MusicPlayer() {
  const myAudio = useRef(null);
  const audioSource = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Add loading state
  const [loading, setLoading] = useState(true);

  const [backendData, setBackendData] = useState({
    data: [], // backend data
    activeId: null, // Actived music id
  });

  // Connect FE & BE Server
  const loadData = async () => {
    try {
      const response = await axios.get('https://skoog-music-backend.onrender.com/musicPlayer');
      console.log('Received from backend:', response.data);
      const tempData = response.data?.data?.map((item) => {
        return {
          ...item,
          show: false,
        };
      });
      setBackendData({
        ...backendData,
        data: tempData,
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data from backend:', error);
      setLoading(false);
    }
  };

  /**
   * play song
   * @param songPath
   */

  const playSong = async (id) => {
    const activeMusic = backendData?.data.find((item) => item._id === id);
  
    if (activeMusic) {
      // Update musicList state
      const newList = backendData?.data.map((item) => {
        item.active = item._id === id;
        return item;
      });
  
      // Update backendData
      setBackendData({
        ...backendData,
        data: newList,
        activeId: id,
      });
  
      // Pause the current music
      await myAudio.current.pause();
      const audioSourcePath = activeMusic ? `https://skoog-music-backend.onrender.com/music/${activeMusic.name}.mp3` : '';
      audioSource.current.src = audioSourcePath;
      await myAudio.current.load();
  
      // Play the music
      await myAudio.current.play();
      setIsPlaying(true);
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
    myAudio.current.pause();
    setIsPlaying(false);
  };

  /**
   * Start/Pause song
   */
  const togglePlayPause = () => {
    if (isPlaying) {
      stopSong();
    } else {
      startSong();
    }
  };


  /**
   * Start song
   */
  const startSong = () => {
    myAudio.current.play();
    setIsPlaying(true);
  };

  const allTags = useMemo(() => {
    const tagsArray = backendData?.data.flatMap((musicItem) => musicItem.tags) || [];
    return [...new Set(tagsArray)];
  }, [backendData]);

  const [activeCategory, setActiveCategory] = useState('All');
  const handleCategoryChange = (category) => {
    const newData = backendData.data.map((item) => {
      item.show = item.tags[1] === category;
      return item;
    });

    setBackendData({
      ...backendData,
      data: newData,
    });

    setActiveCategory(category);
  };


  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const playMusic = async () => {
      try {
        if (activeMusic) {
          const audioSourcePath = `https://skoog-music-backend.onrender.com/music/${activeMusic.name}.mp3`;
          
          // Pause the current music
          myAudio.current.pause();
  
          // Load the new music source
          audioSource.current.src = audioSourcePath;
          await myAudio.current.load();
  
          // Play the music if isPlaying is true
          if (isPlaying) {
            await myAudio.current.play();
          }
        }
      } catch (error) {
        console.error('Error playing or loading audio:', error);
      }
    };
  
    playMusic();
  }, [activeMusic, isPlaying]);


  return (
    <>
      <div className="music-player">
        <SearchComp
          musicList={backendData}
          onChange={(keyword) => {
            const newData = backendData.data.map((item) => {
              item.show = item.name.includes(keyword);
              return item;
            });

            setBackendData({
              data: newData,
              activeId: null,
            });

            setActiveCategory(keyword === '' ? 'All' : null);
          }}
        />

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
          </div>
          {/* Music Card */}
          <div className="button-container music-btns-list">
            {!loading ? (
              backendData.data
                .filter((item) => activeCategory === 'All' || item.show)
                .map((item) => (
                  <MusicBtn
                    onClick={() => playSong(item._id)}
                    key={item._id}
                    face={`https://skoog-music-backend.onrender.com/images/${item.name}.jpg`}
                    name={item.name}
                    color={item?.tags?.[1]}
                  />
                ))
            ) : (
              <div>Loading...</div>
            )}
          </div>

          {/* dock component */}
          <div className="dock-background">
            <div className="dock-buttons">
              <div className="dock-text">🎵 {activeMusic ? activeMusic.name : 'music'}</div>
              <div className="dock-button toggle-play" onClick={togglePlayPause}>
                {isPlaying ? '⏸️' : '▶️'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MusicPlayer;
