import React, { useState, useEffect } from 'react';
import MusicItem from './MusicItem';

const MusicList = ({ musicData, onMusicClick }) => {
  // Initialize musicInfo as an empty array, and update it when musicData changes.
  const [musicInfo, setMusicInfo] = useState([]);

  useEffect(() => {
    if (Array.isArray(musicData)) {
      // If musicData is an array, update musicInfo with it.
      setMusicInfo(musicData);
    } else {
      // Handle the case where musicData is not an array (e.g., null or undefined).
      // You can log an error or take appropriate action here.
      console.error('musicData is not an array');
    }
  }, [musicData]);

  return (
    <div>
      {/* map list: */}
      {musicInfo.map((musicInfoItem) => {
        return (
          <div key={musicInfoItem._id} onClick={() => onMusicClick(musicInfoItem._id)}>
            <MusicItem info={musicInfoItem} />
          </div>
        );
      })}
    </div>
  );
};

export default MusicList;