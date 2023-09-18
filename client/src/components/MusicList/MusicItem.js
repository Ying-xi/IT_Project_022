import React from 'react';
import style from './index.module.css';

const MusicItem = (props) => {
  return (
    <div className={style['music-item-wrap']}>
      <div>{props.info?.name}</div>
      <div className={style['types']}>
        {props.info?.types.map((type, inx) => (
          <div className={style['type-item']} key={inx}>
            {type}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicItem;
