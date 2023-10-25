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

  const [backendData, setBackendData] = useState({
    data: [], // backend data
    activeId: null, // Actived music id
  });

  // Connect FE & BE Server
  const loadData = async () => {
    try {
      const response = await axios.get('https://skoog-music.onrender.com/musicPlayer');
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
    } catch (error) {
      console.error('Error fetching data from backend:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  /**
   * play song
   * @param songPath
   */

  const playSong = (id) => {
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

      // pause the current music
      myAudio.current.pause();

      const audioSourcePath = `${process.env.PUBLIC_URL}/${activeMusic.file}`;

      audioSource.current.src = audioSourcePath;
      myAudio.current.load();
      myAudio.current.play();
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
      item.show = item.tags[1] === category; // 标记为：显示筛选的音乐按钮
      return item;
    });

    setBackendData({
      ...backendData,
      data: newData,
    });

    setActiveCategory(category);
  };

  return (
    <>
      <div className="music-player">
        <SearchComp
          musicList={backendData}
          onChange={(keyword) => {
            const newData = backendData.data.map((item) => {
              // item.show = keyword === item.name; // 标记为：显示筛选的音乐按钮
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
            {backendData && backendData.data ? (
              backendData.data
                .filter((item) => activeCategory === 'All' || item.show)
                .map((item) => (
                  <MusicBtn
                    onClick={() => playSong(item._id)}
                    key={item._id}
                    face={item.picture}
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
              <div className="dock-text">🎵 {activeMusic?.name ?? 'music'}</div>
              {isPlaying ? (
                <div className="dock-button toggle-play" onClick={stopSong}>
                  ⏸️
                </div>
              ) : (
                <div
                  className="dock-button toggle-play"
                  onClick={() => startSong(activeMusic.song)}
                >
                  ▶️
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MusicPlayer;
