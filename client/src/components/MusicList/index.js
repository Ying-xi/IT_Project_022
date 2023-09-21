import React, { useState } from 'react';
import style from './index.module.css';
import MusicItem from './MusicItem';

const MusicList = ({ musicData }) => {
  const [musicInfo, setMusicInfo] = useState(musicData);

  return (
    <div>
      {/* 列表项 */}
      {musicInfo.map((musicInfoItem) => {
        return <MusicItem info={musicInfoItem} key={musicInfoItem._id} />;
      })}
    </div>
  );
};

export default MusicList;
