import React from 'react';
import style from './index.module.css';

const MusicItem = (props) => {
  const tags = props.info?.tags;

  /* filter "All" tag */
  const filteredTags = tags ? tags.filter(tag => tag !== "All") : [];

  return (
    <div className={style['music-item-wrap']}>
      <div className={style['music-info']}>
        <div className={style['music-name']}>{props.info?.name}</div>
        <div className={style['tags']}>
          {filteredTags.map((tag, index) => (
            <div className={style['tag']} key={index}>
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicItem;
