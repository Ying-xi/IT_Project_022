import React, { useState } from 'react';
import style from './index.module.css';
import MusicItem from './MusicItem';

const MusicList = () => {
  const [musicInfo, setMusicInfo] = useState([
    {
      id: 1,
      name: 'Music1',
      types: ['type'],
    },
    {
      id: 2,
      name: 'Music2',
      types: ['type'],
    },
    {
      id: 3,
      name: 'Music3',
      types: ['type'],
    },
    {
      id: 4,
      name: 'Music4',
      types: ['type'],
    },
    {
      id: 5,
      name: 'Music5',
      types: ['type'],
    },
  ]);

  return (
    <div className={style['music-wrap']}>
      <header className={style['music-header']}>Admin page</header>
      <main>
        {/* 标头 */}
        <div className={style['music-main-head']}>
          <div>Music Management</div>
          <div>Type</div>
          <div>Add+</div>
        </div>

        {/* 列表项 */}
        {musicInfo.map((musicInfoItem) => {
          return <MusicItem info={musicInfoItem} key={musicInfoItem.id} />;
        })}
      </main>
    </div>
  );
};

export default MusicList;
