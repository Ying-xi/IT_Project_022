import React, { useState } from 'react';
import style from './index.module.css';
import MusicItem from './MusicItem';

const MusicList = ({ musicData }) => {
  const [musicInfo, setMusicInfo] = useState(musicData);

  return (
    <div className={style['music-wrap']}>
      <main>
        {/* 标头 */}
        <div className={style['music-main-head']}>
          <div>Music Management</div>
          <div>Type</div>
          <div>Add+</div>
        </div>

        {/* 列表项 */}
        {musicInfo.map((musicInfoItem) => {
          return <MusicItem info={musicInfoItem} key={musicInfoItem._id} />;
        })}
      </main>
    </div>
  );
};

export default MusicList;
