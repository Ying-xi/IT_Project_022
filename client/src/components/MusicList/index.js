import React, { useState } from 'react';
import MusicItem from './MusicItem';

const MusicList = ({ musicData, onMusicClick }) => {
  const [musicInfo, setMusicInfo] = useState(musicData);

  return (
    <div>
      {/* 列表项 */}
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
