import React, { useState, useEffect } from 'react';
import MusicItem from './MusicItem';

const MusicList = ({ musicData, onMusicClick }) => {
  // Initialize musicInfo as an empty array, and update it when musicData changes.
  const [musicInfo, setMusicInfo] = useState(musicData);

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